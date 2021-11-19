const database = require("./database");
const fs = require("fs");

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
        const res = await database.query("INSERT INTO users (avatar) VALUES (?)", [avatar, id]);
    } 
    catch (error) {
        throw {
            status: 500,
            msg: error
        };
    }
};

/**
 * Modification Avatar - Modifier l'image du profil utilisateur.
 *
 * @param   {String}  avatar  URL de l'image.
 * @param   {Number}  id      Id de l'utilisateur.
 *
 * @return  {Promise.<void>}         
 */ 
module.exports.modifyAvatar = async function (avatar, id){
    try {
        const res = await database.query("UPDATE users SET avatar=? WHERE id=?", [avatar, id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
};

/**
 * Suppression Avatar - Supprimer l'image du profil utilisateur.
 *
 * @param   {String}  avatar  URL de l'image
 * @param   {Number}  id      id de l'utilisateur
 *
 * @return  {Promise.<void>}         
 */ 
module.exports.deleteAvatar = async function (avatar, id){
    try {
        const res = await database.query("DELETE FROM `users` WHERE 0", [avatar, id]);
        return res;     
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
};

// Ajouter une image à une publication.
module.exports.addImagePost = async function (postId, image){
    try{
        await database.query("UPDATE `posts` SET `image` = '?' WHERE `posts`.`id` = ?", [image, postId]); // Requête pour enregistrer.
    }
    catch(error){
        throw error;
    }
};

// Modifier l'image d'une publication.
module.exports.modifyImagePost = async function (postId, image){
    try{
        await database.query("UPDATE `posts` SET `image` = '?' WHERE `posts`.`id` = ?", [image, postId]); 
    }
    catch(error){
        throw error;
    }
};

// Supprimer une image.
module.exports.deleteImagePost = function (filename){
    fs.unlink(`images/${filename}`, (err) => {
        if (err) throw err;
                console.log('Image supprimée')
            })
};

// Récupérer l'image d'une publication.
module.exports.getImagePost = async function(id){
    const data = await database.getOne("SELECT image from `posts` WHERE id=?", [id]);
    // console.log(data);
    if (data.image === undefined) return null;
    return data.image.split('/images/')[1];
}

// Supprimer toutes les images (du profil et des publications).
module.exports.deleteAllImages = async function (userId){

// for (let i = 0; i < image_user.length; i++) {
//     await Image.deleteImageStorie(image_user[i].content);
//     }
//     await Image.imageUser(user.avatar);
//     await User.deleteUser(req.body.userId);
//     await Image.deleteImage(req.body.userId);
};


