const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');

// Chiffre le MDP de l'utilisateur, ajoute l'utilisateur à la BDD.
router.post('/signup', userCtrl.signup);  

// Vérifie les informations d'identification de l'utilisateur en renvoyant l'identifiant userId depuis la BDD et un jeton web JSON signé (contenant également l'identifiant userId) 
router.post('/login', userCtrl.login);      

// Route pour modifier le profil
router.put('/:id', auth, userCtrl.update);

// Route pour récupérer les informations d'un utilisateur
router.get('/:id', auth, userCtrl.getOneUser);

// Route pour récupérer les informations de tous les utilisateurs
router.get('/', auth, userCtrl.getAllUser);

// Route pour supprimer un utilisateur
router.delete('/:id',  auth, userCtrl.deleteUser);


module.exports = router;