// Fichier contenant notre logique métier.
const Post = require('../models/Post');
const fs = require('fs'); 

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
 * @returns {void}
 * 
 */

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.message);
    delete postObject._id;
    const post = Post.addPost({
        ...postObject,
        message: `${req.body.message, req.body.userId}`,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, // On génère l'URL de l'image (le protocole, le nom d'hôte et le nom du fichier).
    });
    post.save()
    .then(() => res.status(201).json({ message: 'Publication ajoutée avec succès !' })) // Message d'alerte.
    .catch(error => {
        res.status(400).json({ error })
    });
};

/**
 * Route GET pour la lecture de toutes les publications - Récupère toutes les publications.
 *
 * @return  {JSON}      JSON de tous les publications.
 */

exports.getAllPosts = (req, res, next) => {
    try{
        const data = Post.getAllPostsWithTheirComments();
         res.status(200).json( data );
    }
    catch(error){
        res.status(400).json({ error })
    };
};

/**
 * Route GET pour la lecture d'un post - Récupère toutes les infos d'une seule publication.
 *
 * @param   {String}  req.body.postId     Id de la publication.
 *
 * @return  {JSON}                      JSON de la publication demandée.
 */

exports.getOnePost = (req, res, next) => {
    Post.getPostWithItsComments({ _id: req.body.postId }) 
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

/**
 * Route PUT pour la modification d'une publication - Mettre à jour une publication.
 *
 * @param   {String}  req.params.id     Id de la publication.
 * @param   {Object}  req.body          Tous les champs du formulaire.
 * 
 * @returns {void}
 */

exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
        {
            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

/**
 * Route DELETE pour la suppression d'une publication - Supprimer une publication. /api/posts/:id
 *
 * @param   {String}  req.params.id   Id de la publication.
 * 
 * @returns {void}
 */

exports.deletePost = (req, res, next) => {
  // Avant de suppr l'objet, on va le chercher pour obtenir l'url de l'image et supprimer le fichier image de la BDD.
  Post.findOne({ _id: req.params.id }) //méthode findOne de mongoose afin de récupérer l’objet à partir de son id.
    .then(post => {
      // Pour extraire ce fichier, on récupère l'url de la publication, et on le split autour de la chaine de caractères, donc le nom du fichier.
      const filename = post.imageUrl.split('/images/')[1];
      // Avec ce nom de fichier, on appelle unlink pour suppr le fichier.
      fs.unlink(`images/${filename}`, () => {
        // On supprime le document correspondant de la base de données.
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
