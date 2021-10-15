const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');

// Chiffre le MDP de l'utilisateur et l'ajoute à la BDD.
router.post('/signup', userCtrl.signup);  

// Vérifie les informations d'identification de l'utilisateur en renvoyant l'identifiant userId depuis la BDD et un jeton web JSON signé (contenant également l'identifiant userId).
router.post('/login', userCtrl.login);      

// Route pour modifier le profil.
router.put('/:id', auth, userCtrl.modifyUser);

// Route pour récupérer les informations du profil utilisateur.
router.get('/:id', auth, userCtrl.getOneUser);

// Route pour supprimer un utilisateur.
router.delete('/:id',  auth, userCtrl.deleteUser);

// Chargement du module dans l'application.
module.exports = router;