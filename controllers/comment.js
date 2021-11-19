const Comment = require('../models/Comment');


/**
 * Route POST pour la création d'un commentaire - Ajoute un commentaire sur une publication à la base de données.
 *
 * @param   {Object}  req                       La requête.
 * @param   {Object}  req.body                  Champ du formulaire.
 * @param   {String}  req.body.userId           Id de l'utlisateur.
 * @param   {String}  req.body.message          Contenu du commentaire.
 * @param   {String}  req.body.postId           Id de la publication..
 * @param   {("GET" | "POST")}  req.protocol    GET ou POST
 * 
 * @returns {Promise.<void>}
 * 
 */
exports.createComment = async (req, res, next) => {
    try{
        const {userId, message, postId} = req.body;
        await Comment.addComment({userId, message, postId});
        res.status(201).json({"msg" : "commentaire ajouté"});
    }
    catch(err){
        res.status(500).json({ err });
    }
};

/**
 * ROUTE PUT pour la modification du contenu d'un commentaire.
 *
 * @param   {Object}  req                La requête.
 * @param   {Object}  req.params         
 * @param   {String}  req.params.id
 * @param   {Object}  req.body           Contenu du commentaire.
 * @param   {String}  req.body.messsage  Contenu du commentaire.
 * @param   {Number}  req.body.id        Contenu du commentaire.
 * @param   {Object}  res                La réponse.
 *
 * @return  {Promise.<void>}        
 */
exports.modifyComment = async (req, res, next) => {
    //TODO en cas de bug faire un console.log de ce que l'on recois
    try{
        const verifComment = await Comment.getOneComment(req.params.id);
        if (verifComment === null || verifComment.id_author !== req.body.id) {
            return res.status(401).json({"msg":"ce message ne peux pas être modifié"});
        }
        await Comment.modifyComment(req.params.id, req.body.messsage);
    }
    catch(err){
        res.status(500).json({ err });
    }
};

exports.deleteComment=   (req, res, next) => {
//TODO
};
