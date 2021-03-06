// Middleware d'authentification
// importation du paquet jwt
const jwt = require('jsonwebtoken');        

/**
 * Vérifie l'autorisation de l'utilisateur
 * @param   {Object}  req
 * @param   {Object}  req.headers
 * @param   {String}  req.headers.authorization     Bearer + numéro du Token.
 * @param   {Object}  req.body                      Champs du formulaire.
 * @param   {String}  req.body.userId               userId de l'utilisateur.
 *
 */
module.exports = (req, res, next) => {
    try {                                                                               // On utilise try/catch car plusieurs éléments peuvent poser problème.
        if (!req.headers.authorization) throw "pas de jeton";
        const [_, token, idToken] = req.headers.authorization.split(' ');                          // On récupère uniquement le token du header de la requête.
        const decodedToken = jwt.verify(token, process.env.SECRET);                     // On décode le token avec la fonction verify qui prend le token et la clé secrète.
        const userId = decodedToken.userId;// On récupère le userId du token décodé.
        const refId = req.body.userId ? req.body.userId : idToken ;

        if ( ! refId || refId !== userId) {                            // Si on obtient bien un userId et que celui-ci est différent du userId.
            throw 'Identifiant utilisateur non valable';                                // On renvoi l'erreur.
        } else {
            next();                                                                     // Sinon on appelle next car la validation est un succès.
        }
    } catch {
    res.status(401).json({error: 'Requête non authentifiée !'});                // Si une erreur d'authentification est reçue (401) on l'affiche, sinon on affiche le message personnalisé.
    }
};