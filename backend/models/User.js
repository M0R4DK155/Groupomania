/**
 * @typedef {import("../typedef.js").FullUserDataFromBase} FullUserDataFromBase
 */

const database = require("./database");

/**
 * Ajout d'un utilisateur dans la BDD.
 *
 * @param   {Object}  user              Champs du formulaire.
 * @param   {String}  user.firstname    Prénom de l'utilisateur.
 * @param   {String}  user.lastname     Nom de l'utilisateur.
 * @param   {String}  user.alias        Pseudo de l'utilisateur.
 * @param   {String}  user.avatar       Photo du Profil.
 * @param   {String}  user.password     Password de l'utilisateur.
 * @param   {String}  user.email        Email de l'utilisateur.
 *
 * @return  {Promise.<void>}            Insère les données dans la BDD.
 */

module.exports.addUser = async function (user) {
    try {
        const res = await database.query("INSERT INTO users(prenom, nom, pseudo, password, email, id_roles) VALUES (?,?,?,?,?,?,?)", [user.firstname, user.lastname, user.alias, user.avatar, user.password, user.email, 0]);
    }
    catch (error) {
        throw {
            status: 500,
            msg: error
        };
    }
}

/**
 * Recherche d'un utilisateur par son email.
 * 
 * @param   {String}  email                     Email de l'utilisateur.
 *
 * @return  {Promise.<FullUserDataFromBase>}    Récupère les données de l'utilisateur dans la BDD.
 */

module.exports.findUserByEmail = async function (email){
    try {
        const res = await database.getOne("SELECT * FROM `users` WHERE `email` = ?", [email]);
        if (res === null) throw( {status : 401, msg : "L'utilisateur n'existe pas"});
        return res;
    }
    catch (error) {
        throw ({
            status: error.status || 500,
            msg: error.msg ? error.msg : error
        });
    }
}

/**
 * Recherche d'un utilisateur par son email.
 * 
 * @param   {String}  userId                     Id de l'utilisateur.
 *
 * @return  {Promise.<FullUserDataFromBase>}     Récupère les données de l'utilisateur dans la BDD.
 */

module.exports.findUserById = async function (userId){
    try {
        const res = await database.getOne("SELECT * FROM `users` WHERE `id` = ?", [userId]);
        if (res === null) throw( {status : 401, msg : "L'utilisateur n'existe pas"});
        return res;
    }
    catch (error) {
        throw ({
            status: error.status || 500,
            msg: error.msg ? error.msg : error
        });
    }
}
/**
 * Modification du profil utilisateur.
 *
 * @param   {Object}  user      Champs du formulaire.
 * @param   {Number}  id        id de l'utilisateur.
 *
 * @return  {Promise.<void>}    Modifie les données dans la BDD.
 */

module.exports.modifyUser = async function (user, id){
    try{
        const res = await database.getOne("UPDATE users SET prenom=?, nom=?, pseudo=? WHERE id=?", [user.firstname, user.lastname, user.alias, id]);
        return res;
    }
    catch (error) {
        throw({
            status: 500,
            msg: error
        });
    }
}

/**
 * Suppression d'un utilisateur.
 *
 * @param   {String}  id        id de l'utilisateur.
 *
 * @return  {Promise.<void>}    
 */
module.exports.deleteUser = async function (id) {
    try {
        const res = await database.getOne("DELETE FROM users WHERE id = ?", [id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}
