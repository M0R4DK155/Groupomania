const Comment = require('../models/Comment');


/**
 * Route POST pour la création d'un commentaire - Ajoute un commentaire sur une publication à la base de données.
 *
 * @param   {Object}  req                       La requête.
 * @param   {Object}  req.body                  Champ du formulaire.
 * @param   {String}  req.body.userId           Id de l'utlisateur.
 * @param   {String}  req.body.message          Contenu de la publication.
 * @param   {String}  req.body.postId           Contenu de la publication.
 * @param   {Object}  req.file
 * @param   {String}  req.file.filename         Image de la publication.
 * @param   {("GET" | "POST")}  req.protocol    GET ou POST
 * 
 * @returns {Promise.<void>}
 * 
 */
exports.createComment = async (req, res, next) => {
    try{
        const {userId, message, postId} = req.body;
        await Comment.addComment({userId, message, postId});
        if (req.file.filename) {} // TODO compléter : on appelera le model image
        res.status(201).json({"msg" : "commentaire ajouté"});
    }
    catch(err){
        res.status(500).json({ err });
    }

};

exports.getOneComment=   (req, res, next) => {

};

exports.getAllComments=  (req, res, next) => {

};

exports.modifyComment=   (req, res, next) => {

};

exports.deleteComment=   (req, res, next) => {

};
