/**
 * @typedef {import("../typedef.js").commentData} commentData
 */

const database = require("./database");


/**
 * Ajouter un commentaire.
 *
 * @param   {Object} data                  Champ du formulaire.
 * @param   {String} data.userId           Id de l'utlisateur.
 * @param   {String} data.message          Contenu du commentaire
 * @param   {String} data.postId           le message auquel on répond
 * 
 * @returns {Promise}
 * 
 */
module.exports.addComment = async function (data) {
    return await database.query(
        "INSERT INTO `comments` (`id_author`, `message`,`date`, `id_post`) VALUES ( ?, ?, NOW(), ?)", 
        [data.userId, data.message, data.postId]
    );
};

// Récupérer tous les commentaires.
module.exports.getAllComments = async function (data) {
    return await database.query(
        "SELECT * FROM `comments`",
        [data.comments]
    )
};

// Récupérer un commentaire.
module.exports.getOneComment = async function () {
    return await database.query()
};

// Modifier un commentaire.
module.exports.modifyComment = async function () {
    return await database.query()
};

// Supprimer un commentaire.
module.exports.deleteComment = async function () {
    return await database.query()
};

