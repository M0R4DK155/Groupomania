// Fichier contenant notre logique métier.
const Post = require('../models/Post');
const Image = require('../models/Image');
const fs = require('fs');
const sharp = require('sharp');

/**
 * Route POST pour la création d'une publication - Ajoute une publication à la BDD.
 *
 * @param   {Object}  req                       La requête.
 * @param   {Object}  req.body                  Champ du formulaire.
 * @param   {String}  req.body.userId           Id de l'utlisateur.
 * @param   {String}  req.body.message          Contenu de la publication.
 * @param   {Object}  req.file                  Image de la publication.
 * @param   {String}  req.file.filename         Image de la publication.
 * @param   {("GET" | "POST")}  req.protocol    get ou post
 *
 * @returns {Promise.<void>}
 *
 */
exports.createPost = async (req, res, next) => {
    try {
        const name = Date.now() + '-' + req.file.filename.split(' ').join('_');

        await addImage(req.file, name);
        await Image.addImagePost({ userId: req.body.userId, content: name });
        await Post.addPost({idAuthor : req.body.userId, message : req.body.message});
        res.status(201).json({
            ...req.body,
            content: `${req.protocol}://${req.get(
                'host'
            )}/images/posts/${name}`,
        });
    } catch (error) {
        res.status(400).json({ error });
    }
};

/**
 * Route GET pour la lecture de toutes les publications - Récupère toutes les publications.
 *
 * @return  {JSON}      JSON de tous les publications.
 */

exports.getAllPosts = (req, res, next) => {
    try {
        const data = Post.getAllPostsWithTheirComments();
        res.status(200).json(data);
    } catch (error) {
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
 * @return  {JSON}                      JSON de la publication demandée.
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
 * @param   {Object}  req.params
 * @param   {Number}  req.params.id     Id de la publication.
 *
 * @returns {void}
 */

exports.modifyPost = (req, res, next) => {};

/**
 * Route DELETE pour la suppression d'une publication - Supprimer une publication. /api/posts/:id
 *
 * @param   {String}  req.params.id   Id de la publication.
 *
 * @returns {void}
 */

exports.deletePost = (req, res, next) => {};

async function addImage(file, filename) {
    try {
        await sharp(file.buffer)
            .resize(1000, 667)
            .webp()
            .toFile('./images/posts/' + filename);
    } catch (err) {
        console.error(err);
        throw err;
    }
}
