/**
 * @typedef {import("../typedef.js").postData} postData
 */

const database = require("./database");

/**
 * Ajouter une publication.
 * 
 * CREATE
 *
 * @param   {import("../typedef").postData}  data       Les données saisies par l'utilisateur.
 *
 * @return  {Promise.<postData>}                        Envoi les données dans la BDD.
 */
module.exports.addPost =  async function (data){
    // console.log(await database.getOne('SELECT '+data.id+' FROM `users`'));
    // console.log(await database.getOne('SELECT * FROM `users`'));
    return await database.query("SELECT posts.message, posts.id_author AS messageAuthor, comments.id_author AS commentAuthor FROM posts JOIN comments ON comments.id_post = posts.id", [data]);
};


// Récupérer une publication avec tous ses commentaires. - READ
module.exports.getPostWithItsComments =  async function (idPost){
    // console.log(await database.getOne('SELECT * FROM `users`'));
    return await database.query("SELECT * FROM posts JOIN comments ON comments.id_post = posts.id WHERE posts.id=?",[idPost]);
};

// Récuperer toutes les publications avec leurs commentaires. - READ
module.exports.getAllPostsWithTheirComments =  async function (){
    // console.log(await database.getOne('SELECT * FROM `users`'));
    return await database.query("SELECT posts.message, posts.id_author AS messageAuthor, comments.id_author AS commentAuthor FROM posts JOIN comments ON comments.id_post = posts.id");
};


/**
 * Modifier une publication.
 * 
 * UPDATE
 *
 * @param   {String}  data                      [email description]
 *
 * @return  {Promise.<FullUserDataFromBase>}    [return description]
 */
module.exports.updatePost =  async function (data) {

};

/**
 * Supprimer une publication.
 * 
 * DELETE
 *
 * @param   {String}  data                      [email description]
 *
 * @return  {Promise.<FullUserDataFromBase>}    [return description]
 */
module.exports.delePost =  async function (data) {

};

