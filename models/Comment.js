/**
 * @typedef {import("../typedef.js").commentData} commentData
 */

const database = require("./database");

/**
 * Ajouter un commentaire sur une publication. - CREATE
 *
 * @param   {Object} data           Champ du formulaire.
 * @param   {String} data.userId    Id de l'utlisateur.
 * @param   {String} data.message   Contenu du commentaire.
 * @param   {String} data.postId    Publication à laquelle on répond.
 * 
 * @returns {Promise}
 * 
 */
module.exports.addComment = async function (data) {
    return await database.query(
        "INSERT INTO `comments` (`id_author`, `message`, `date`, `id_post`) VALUES ( ?, ?, NOW(), ?)", 
        [data.userId, data.message, data.postId]
    );
};

/**
 * Récupérer tous les commentaires. - READ
 *
 * @param   {Object}  data  Champ du formulaire
 * 
 * @return  {Promise.<void>}    
 * 
 */
// module.exports.getAllComments = async function (data) {
//     return await database.query(
//         "SELECT * FROM `comments`",
//         [data.comments]
//     );
// };

/**
 * Modifier un commentaire. - UPDATE
 * 
 * @param   {String}    idComment   Id du commentaire.
 * @param   {String}    message     le nouveau commentaire
 * 
 * @return  {Promise.<void>}
 * 
 */
module.exports.modifyComment = async function (idComment, message) {
    await database.query(
        "UPDATE `comments` SET `message` = '?' WHERE `comments`.`id` = ?;",
        [message, idComment]
    );
};

/**
 * Supprimer un commentaire.- DELETE
 * 
 * @param   {String}    idComment   Id du commentaire.
 * 
 * @return  {Promise.<void>}
 * 
 */
module.exports.deleteComment = async function (idComment) {
    return await database.query(
        "DELETE FROM `comments` WHERE `comments`.`id` = ?;",
        [idComment]
    );
};

/**
 * Récupérer un commentaire. - READ
 * 
 * @param   {String}    idComment   Id du commentaire
 * 
 * @return  {Promise.<Object>}
 * 
 */
module.exports.getOneComment = async function (idComment) {
    return await database.getOne(
        "SELECT * FROM `comments` WHERE `id` = ?", 
        [idComment]
    );
};
