const database = require("./database");
module.exports.getAllPostsWithTheirComments =  async function (){
    // console.log(await database.getOne('SELECT * FROM `users`'));
    return await database.query("SELECT posts.message, posts.id_author AS messageAuthor, comments.id_author AS commentAuthor FROM posts JOIN comments ON comments.id_post = posts.id");
}
module.exports.getPostWithItsComments =  async function (idPost){
    // console.log(await database.getOne('SELECT * FROM `users`'));
    return await database.query("SELECT * FROM posts JOIN comments ON comments.id_post = posts.id WHERE posts.id=?",[idPost]);
}