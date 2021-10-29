const database = require("./database");

/**
 * Ajouter Avatar - Ajouter une image au profil utilisateur.
 *
 * @param   {String}  avatar     URL de l'image
 * @param   {Number}  id        id de l'utilisateur
 *
 * @return  {Promise.<void>}         
 */ 

module.exports.addAvatar = async function (avatar, id){
    try {
        const res = await database.getOne("INSERT INTO users (avatar) VALUES (?)", [avatar, id])
    } catch (error) {
        throw {
            status: 500,
            msg: error
        };
    }
};

/**
 * Modification Avatar - Modifier l'image du profil utilisateur.
 *
 * @param   {String}  avatar  URL de l'image
 * @param   {Number}  id      id de l'utilisateur
 *
 * @return  {Promise.<void>}         
 */ 
module.exports.modifyAvatar = async function (avatar, id){
    try {
        const res = await database.getOne("UPDATE users SET avatar=? WHERE id=?", [avatar, id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
};

// Supprimer une image
module.exports.deleteAvatar = async function (avatar){
    try {
        const res = await database.getOne("DELETE FROM `users` WHERE 0", [avatar]);
        return res;     
    }catch (error) {
        throw ({
            status: 500,
            msg: error
        });
};

// Ajouter une image à une publication
module.exports.addImagePost = async function (image){
    try{
        const res = await database.getOne("INSERT INTO `posts` (`image`, `date`) VALUES (?)", [image]) //requete pour enregistrer
    }
    catch(error){
        throw error;
    }
};

// Modifier l'image d'une publication
module.exports.modifyImagePost = async function (){

};

// Supprimer une image
module.exports.deleteImagePost = async function (){

};

// Supprimer toutes les images (du profil et des publications).
module.exports.deleteAllImages = async function(idUser){

// for (let i = 0; i < image_user.length; i++) {
//     await Image.deleteImageStorie(image_user[i].content);
//     }
//     await Image.imageUser(user.avatar);
//     await User.deleteUser(req.body.userId);
//     await Image.deleteImage(req.body.userId);
};
