require("dotenv").config();

/**
 * @typedef {import("../typedef.js").simpleMessage}         simpleMessage 
 * @typedef {import("../typedef.js").FullUserDataFromBase}  FullUserDataFromBase 
 */

// Import des modules et fichiers complémentaires
const bcrypt = require('bcrypt');           // Bibliothèque permettant de hacher les mots de passe.
const jwt = require('jsonwebtoken');        // Permet de créer et vérifier des tokens d'authentification.
const User = require('../models/User');     // On importe le model User
const Image = require('../models/Image');   // On importe le model Image

// Middlewares d'authentification.
/**
 * Enregistrement de l'utilisateur /user/signup.
 *
 * @param   {Object}  req                   La requête.
 * @param   {Object}  req.body              Champs du formulaire.
 * @param   {String}  req.body.firstname    Prénom de l'utilisateur.
 * @param   {String}  req.body.lastname     Nom de l'utilisateur.
 * @param   {String}  req.body.alias        Pseudo de l'utilisateur.
 * @param   {String}  req.body.email        Email de l'utilisateur.
 * @param   {String}  req.body.password     Mot de passe de l'utilisateur.
 * @returns {Promise.<void>}                Envoi la réponse contenant un objet de type simpleMessage.
 */
exports.signup = async (req, res, next) => {
    /**
     * la réponse
     *
     * @type {simpleMessage}
     */
    let answer = {};
    let status = 201;
    try {
        if (User.checkIfAliasExists(req.body.alias)) throw {status:400, answer:"pseudo déjà existant"};
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await User.addUser(req.body);
        answer.msg = 'Utilisateur créé !';
        res.status(201).json(answer);
    } 
    catch (error) {
        // console.log(error.stack)
        answer = error;
        status = error.status || 400;
    }
    finally{
        res.status(status).json(answer);
    }
};

/**
 * Connecter un utilisateur - Route login user/login
 *
 * @param   {Object}  req                   La requête.
 * @param   {Object}  req.body              Champs du formulaire.
 * @param   {String}  req.body.email        Email de l'utilisateur.
 * @param   {String}  req.body.password     Mot de passe de l'utilisateur.
 *
 */
exports.login = async (req, res, next) => {
    try {
        const userData = await User.findUserByEmail(req.body.email); // Recherche de l'utilisateur par son email dans la BDD.
        const valid = await bcrypt.compare(
            req.body.password,
            userData.password
        );
        if (!valid) throw { status: 401, msg: 'Mot de passe incorrect !' };
        res.status(200).json({
            userId: userData.id,
            token: jwt.sign(
                // On utilise la fonction sign de jwt pour encoder un token.
                { userId: userData.id },
                process.env.SECRET,
                { expiresIn: '24h' } // Durée de validité du token.
            ),
        });
    } catch (err) {
        return res.status(err.status).json({ error: err.msg });
    }
};

/**
 * Modifier le profil d'un utilisateur - api/auth/user/update
 *
 * @param   {Object}  req                   La requête.
 * @param   {Object}  req.body              Champs du formulaire.
 * @param   {Number}  req.body.userId       Id de l'utilisateur. (ou req.params.id ?)
 * @param   {String}  req.body.alias        Pseudo de l'utilisateur.
 * @param   {String}  req.body.avatar       Photo de Profil.
 * @param   {String}  req.body.firstname    Prénom de l'utilisateur.
 * @param   {String}  req.body.lastname     Nom de l'utilisateur.
 *
 */
exports.modifyUser = async (req, res, next) => {
    try {
        const userData = await User.modifyUser(req, req.body.userId);
        res.status(201).json({
            prenom: req.body.firstname,
            nom: req.body.lastname,
            pseudo: req.body.alias,
            avatar: req.body.avatar
        });
    }
    catch(err){
        return res.status(err.status).json({ error: err.msg });
    }
}

/**
 * Afficher son profil utilisateur. - Route  api/auth/user/profil
 *
 * @param   {Object}    req                     La requête
 * @param   {Object}    req.body                Champ du formulaire
 * @param   {String}    req.body.userId         Id de l'utilisateur.
 * 
 * @return  {Promise.<FullUserDataFromBase>}    Rempli la réponse avec un FullUserDataFromBase et l'envoi.
 */
exports.getOneUser = async (req, res, next) => {
    try {
        const user = await User.findUserById(req.body.userId);
        res.status(201).json({ user });
    }
    catch(err){
        return res.status(err.status).json({ error: err.msg });
    }
};

/**
 * Supprimer un profil utilisateur - Route api/auth/user/profil/delete
 *
 * @param   {Object}    req               La requête
 * @param   {Object}    req.body          Champ du formulaire
 * @param   {String}    req.body.userId   id de l'utilisateur.
 * 
 * @return  {Promise.<void>}          
 */
exports.deleteUser = async (req, res, next) => {
    try {
        await User.deleteUser(req.body.userId);
        await Image.deleteAllImages(req.body.userId);
        
        res.status(201).json({ message: "Utilisateur supprimé !" });
    }
    catch(err){
        return res.status(err.status).json({ error: err.msg });
    }
};
