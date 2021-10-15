/**
 * @typedef {import("../typedef.js").simpleMessage}         simpleMessage 
 * @typedef {import("../typedef.js").FullUserDataFromBase}  FullUserDataFromBase 
 */

// Import des modules et fichiers complémentaires
const bcrypt = require('bcrypt');           // Bibliothèque permettant de hacher les mots de passe.
const jwt = require('jsonwebtoken');        // Permet de créer et vérifier des tokens d'authentification.

const User = require('../models/User');

// Middlewares d'authentification.
/**
 * Enregistrement de l'utilisateur /api/auth/signup.
 *
 * @param   {Object}  req                   La requête.
 * @param   {Object}  req.body              Champs du formulaire.
 * @param   {String}  req.body.firstname    Prénom de l'utilisateur.
 * @param   {String}  req.body.lastname     Nom de l'utilisateur.
 * @param   {String}  req.body.alias        Pseudo de l'utilisateur.
 * @param   {String}  req.body.avatar       Image du profil utilisateur.
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
    let answer;
    let status = 201;
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        await User.addUser(req.body);
        answer.msg = 'Utilisateur créé !';
        res.status(201).json({ message: " "});
    } 
    catch (error) {
        answer = error;
        status = 400;
    }
    finally{
        res.status(status).json(answer);
    }
};

/**
 * Connecter un utilisateur - Route login /user/login
 *
 * @param   {Object}  req                   La requête.
 * @param   {Object}  req.body              Champs du formulaire.
 * @param   {String}  req.body.email        Email de l'utilisateur.
 * @param   {String}  req.body.password     Mot de passe de l'utilisateur.
 *
 */

exports.login = async (req, res, next) => {
    try {
        const userData = await User.findUserByEmail(req.body.email); // Recherche de l'utilisateur dans la BDD.
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
 * Modifier le profil d'un utilisateur - Route login /user/profil
 *
 * @param   {Object}  req                   La requête.
 * @param   {Object}  req.body              Champs du formulaire.
 * @param   {String}  req.body.alias        Pseudo de l'utilisateur.
 * @param   {String}  req.body.avatar       Photo de Profil.
 * @param   {String}  req.body.firstname    Prénom de l'utilisateur.
 * @param   {String}  req.body.lastname     Nom de l'utilisateur.
 *
 */
exports.modifyUser = async (req, res, next) => {
    try {
        const userData = await User.modifyUser(req, req.params.id);
        res.status(201).json({
            prenom: req.body.firstname,
            nom: req.body.lastname,
            pseudo: req.body.alias,
            
        });
    }
    catch(err){
        return res.status(err.status).json({ error: err.msg });
    }
}

/**
 * Afficher son profil utilisateur.
 *
 * @param   {Number}    req.params.id   id de l'utilisateur.
 * 
 * @return  {Promise.<void>}                      Rempli la réponse avec un FullUserDataFromBase et l'envoi.
 */
exports.getOneUser = async (req, res, next) => {
    try {
        const user = await User.findUserByEmail(req.params.id);
        res.status(201).json({ user });
    }
    catch(err){
        return res.status(err.status).json({ error: err.msg });
    }
};


/**
 * Supprimer un profil utilisateur - Route user
 *
 * @param   {Number}  req.params.id     id de l'utilisateur à supprimer.
 * 
 * @return  {Promise.<void>}          
 */
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findUserByEmail(email);
        const image_user = await Image.getAllPosts(req.params.id);
        for (let i = 0; i < image_user.length; i++) {
            await Delete.imageStorie(image_user[i].content);
        }
        await delete.imageUser(user.avatar);
        await User.deleteUser(req.params.id);
        await Image.deleteImage(req.params.id);
        res.status(201).json({ message: "Utilisateur supprimé !" });
    }
    catch(err){
        return res.status(err.status).json({ error: err.msg });
    }
};
