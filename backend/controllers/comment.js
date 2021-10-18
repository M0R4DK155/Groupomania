const Comment = require('../models/Comment');


/**
 * Route POST pour la création d'un commentaire - Ajoute un commentaire sur une publication à la base de données.
 *
 * @param   {Object}  req                       La requête.
 * @param   {Object}  req.body                  Champ du formulaire.
 * @param   {String}  req.body.userId           Id de l'utlisateur.
 * @param   {String}  req.body.message          Contenu de la publication.
 * @param   {String}  req.file.filename         Image de la publication.
 * 
 * @returns {void}
 * 
 */

exports.createComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.message);
    delete commentObject._id;
    const comment = new Comment({
      ...commentObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // Caractéristiques de l'Url d'images
  });
    comment.save()
      .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneComment=   (req, res, next) => {};
exports.getAllComments=  (req, res, next) => {};
exports.modifyComment=   (req, res, next) => {};
exports.deleteComment=   (req, res, next) => {};