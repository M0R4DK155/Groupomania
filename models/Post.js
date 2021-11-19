/**
 * @typedef {import("../typedef.js").postData} postData
 */

const database = require("./database");

/**
 * Ajouter une publication. - CREATE
 *
 * @param   {import("../typedef").postData}  data       Les données saisies par l'utilisateur.
 *
 * @return  {Promise}                                   Envoi les données dans la BDD.
 */
module.exports.addPost =  async function (data){
    // console.log(await database.getOne('SELECT '+data.id+' FROM `users`'));
    // console.log(await database.getOne('SELECT * FROM `users`'));
    // return await database.query(
    //     "SELECT posts.message, posts.id_author AS messageAuthor, comments.id_author AS commentAuthor FROM posts JOIN comments ON comments.id_post = posts.id", 
    //     [data]);
    return await database.query("INSERT INTO `posts` (`id_author`, `message`,  `date`) VALUES (?, ?, NOW())",[data.idAuthor, data.message]);
};


// Récupérer une publication avec tous ses commentaires. - READ
module.exports.getPostWithItsComments =  async function (idPost){
    // console.log(await database.getOne('SELECT * FROM `users`'));
    return await database.query(
        "SELECT * FROM posts JOIN comments ON comments.id_post = posts.id WHERE posts.id=?",
        [idPost]);
};

// Récuperer toutes les publications avec leurs commentaires. - READ
module.exports.getAllPostsWithTheirComments =  async function (){
    // console.log(await database.getOne('SELECT * FROM `users`'));
    return await database.query(
        "SELECT posts.message, posts.id_author AS messageAuthor, comments.id_author AS commentAuthor FROM posts JOIN comments ON comments.id_post = posts.id");
};

/**
 * Modifier une publication. - UPDATE
 *
 * @param   {String}  idPost      Id de la publication.
 * @param   {String}  message     le contenu de la publication.
 *
 * @return  {Promise.<void>}    
 */
module.exports.updatePost =  async function (message, idPost) {
    return await database.query(
        "UPDATE `posts` SET `message` = '?' WHERE `posts`.`id` = ?;",
        [message, idPost]);
};

/**
 * Supprimer une publication. - DELETE
 *
 * @param   {String}  idPost    Id de la publication
 *
 * @return  {Promise.<void>}    
 */
module.exports.deletePost =  async function (idPost) {
    return await database.query(
        "DELETE FROM `posts` WHERE `posts`.`id` = ?;",
        [idPost]);
};

module.exports.getPost =  async function (idPost){
    // console.log(await database.getOne('SELECT * FROM `users`'));
    return await database.query(
        "SELECT * FROM `posts` WHERE `id`=?",
        [idPost]);
};