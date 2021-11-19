/**
 * @typedef {import("../typedef.js").FullUserDataFromBase} FullUserDataFromBase
 */

const database = require("./database");

/**
 * Ajouter un utilisateur dans la BDD. - CREATE
 *
 * @param   {Object}  user              Champs du formulaire.
 * @param   {String}  user.firstname    Prénom de l'utilisateur.
 * @param   {String}  user.lastname     Nom de l'utilisateur.
 * @param   {String}  user.alias        Pseudo de l'utilisateur.
 * @param   {String}  user.email        Email de l'utilisateur.
 * @param   {String}  user.password     Password de l'utilisateur.
 *
 * @return  {Promise.<void>}            Insère les données dans la BDD.
 */
module.exports.addUser = async function (user){
    try {
        const res = await database.query(
            "INSERT INTO users(prenom, nom, pseudo, email, password, role) VALUES (?,?,?,?,?,?)", 
            [user.firstname, user.lastname, user.alias,  user.email, user.password, 0]);
    }
    catch (error) {
        throw {
            status: 500,
            msg: error + user
        };
    }
}

/**
 * Recherche d'un utilisateur par son email. - READ
 * 
 * @param   {String}  email                     Email de l'utilisateur.
 *
 * @return  {Promise.<FullUserDataFromBase>}    Récupère les données de l'utilisateur dans la BDD.
 */
module.exports.findUserByEmail = async function (email){
    try {
        const res = await database.getOne(
            "SELECT * FROM `users` WHERE `email` = ?", 
            [email]);
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
 * Recherche d'un utilisateur par son Id. - READ
 * 
 * @param   {String}  userId                     Id de l'utilisateur.
 *
 * @return  {Promise.<FullUserDataFromBase>}     Récupère les données de l'utilisateur dans la BDD.
 */
module.exports.findUserById = async function (userId){
    try {
        const res = await database.getOne("SELECT * FROM `users` WHERE `id` = ?", 
        [userId]);
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
 * Modification du profil utilisateur. - UPDATE
 *
 * @param   {Object}  user      Champs du formulaire.
 * @param   {Number}  id        id de l'utilisateur.
 *
 * @return  {Promise.<void>}    Modifie les données dans la BDD.
 */
module.exports.modifyUser = async function (user, id){
    try{
        const res = await database.getOne(
            "UPDATE users SET prenom=?, nom=?, pseudo=? WHERE id=?", 
            [user.firstname, user.lastname, user.alias, id]);
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
 * Suppression d'un utilisateur. - DELETE
 *
 * @param   {String}  id        id de l'utilisateur.
 *
 * @return  {Promise.<void>}    
 */
module.exports.deleteUser = async function (id){
    try {
        const res = await database.getOne(
            "DELETE FROM users WHERE id = ?", 
            [id]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}

/**
 * Vérification de la disponibilité du pseudo lors de l'inscription. - READ
 *
 * @param   {String}  alias         Pseudo de l'utilisateur.
 *
 * @return  {Promise.<Boolean>}     TRUE ou FALSE
 */
module.exports.checkIfAliasExists = async function (alias){
    const res = await database.query(
        "SELECT id FROM users WHERE pseudo = ?", 
        [alias]);
    return res.length === 0 ? false : true;
}