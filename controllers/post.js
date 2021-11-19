// Fichier contenant notre logique métier.
const Post = require('../models/Post');
const Image = require('../models/Image');
const sharp = require('sharp');

/**
 * Route POST pour la création d'une publication - Ajoute une publication à la BDD.
 *
 * @param   {Object}  req                       La requête.
 * @param   {Object}  req.body                  Champ du formulaire.
 * @param   {String}  req.body.userId           Id de l'utlisateur.
 * @param   {String}  req.body.message          Contenu de la publication.
 * @param   {Object}  req.file                  
 * @param   {String}  req.file.filename         Image de la publication.
 * @param   {("GET" | "POST")}  req.protocol    get ou post.
 *
 * @returns {Promise.<void>}
 *
 */
exports.createPost = async (req, res, next) => {
    try {
        const {insertId} = await Post.addPost({idAuthor : req.body.userId, message : req.body.message});
        if (req.file){
            const name = Date.now() + '-' + req.file.filename.split(' ').join('_');
            await resizeAndSaveImage(req.file, name);
            await Image.addImagePost({ postId: insertId, content: name });
        }
        res.status(201).json({
            msg:"ajout avec succès"
        });
    } 
    catch (error) {
        // console.log(error);
        res.status(400).json({ error });
    }
};


/**
 * Route GET pour la lecture de toutes les publications - Récupère toutes les publications.
 *
 * @return  {Promise.<void>}      
 */
exports.getAllPosts = async (req, res, next) => {
    try {
        const data = await Post.getAllPostsWithTheirComments();
        res.status(200).json(data);
    } 
    catch (error) {
        res.status(400).json({ error });
    }
};

/**
 * Route GET pour la lecture d'un post - Récupère toutes les infos d'une seule publication.
 *
 * @param   {Object}  req
 * @param   {Object}  req.body
 * @param   {String}  req.body.postId     Id de la publication.
 *
 * @return  {void}                      
 */
exports.getOnePost = (req, res, next) => {
    Post.getPostWithItsComments({ _id: req.body.postId })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(404).json({ error }));
};

/**
 * Route PUT pour la modification d'une publication - Mettre à jour une publication.
 *
 * @param   {Object}  req
 * @param   {Object}  req.body          Tous les champs du formulaire.
 * @param   {Number}  req.body.userId   Id de l'utlisateur.
 * @param   {String}  [req.body.message]     Contenu de la publication.
 * @param   {Object}  [req.file]        Une image
 * @param   {Object}  req.params
 * @param   {String}  req.params.id     Id de la publication.
 *
 * @returns {Promise.<void>}
 */
exports.modifyPost = async (req, res, next) => {
    if (!req.body.message) req.body.message = null;
    try {
        const postToUpdate = await Post.getPost(req.params.id);
        if (postToUpdate === null || postToUpdate.id_author !== req.body.userId) {
            return res.sendStatus(401);
        }
        if (req.file) {
            if (postToUpdate.imageUrl !== null){
                const filename = postToUpdate.imageUrl.split('/images/')[1];
                Image.deleteImagePost(filename);
            }
            resizeAndSaveImage(`${process.env.SERVER}/images/${req.file.filename}`);
        }
        await Post.updatePost( req.body.message, req.params.id );
        res.status(200).send({ message: 'Publication mise à jour'});
    } 
    catch (err) {
        res.sendStatus(500);
    }
};

/**
 * Route DELETE pour la suppression d'une publication - Supprimer une publication. /api/posts/:id
 * @param   {Object}  req
 * @param   {Object}  req.params
 * @param   {String}  req.params.id     Id de la publication.
 *
 * @returns {Promise.<void>}
 */
exports.deletePost = async (req, res, next) => {
    //récupérer l'image 
    const filename = await Image.getImagePost(req.params.id);

    //si il y a une image l'effacer 
    if (filename !== null) Image.deleteImagePost(filename)

    // effacer le post
    await Post.deletePost(req.params.id);
};

async function resizeAndSaveImage(file, filename) {
    try {
        // On redimensionne les images uploadées, les enregistrent au format adéquat et stockent dans la BDD.
        await sharp(file.buffer)
            .resize(1000, 667)
            .webp()
            .toFile('./images/posts/' + filename);
    } catch (err) {
        console.error(err);
        throw err;
    }
}
