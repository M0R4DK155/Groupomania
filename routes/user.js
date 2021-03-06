// Fichier contenant notre logique de routing - Utilisateur.
const express = require('express');
const router = express.Router(); // Appel du routeur avec la méthode mise à disposition par Express
// const auth = require('../middlewares/auth'); // Sécurisation des routes
const userCtrl = require('../controllers/user'); // Importaion du controller.


// Chiffre le MDP de l'utilisateur et l'ajoute à la BDD.
router.post('/signup', userCtrl.signup);  

// Vérifie les informations d'identification de l'utilisateur en renvoyant l'identifiant userId depuis la BDD et un jeton web JSON signé (contenant également l'identifiant userId).
router.post('/login', userCtrl.login);      

// Route pour modifier le profil.
router.put('/:id', userCtrl.modifyUser);
// router.put('/:id', auth, userCtrl.modifyUser);

// Route pour récupérer les informations du profil utilisateur.
router.get('/:id', userCtrl.getOneUser);
// router.get('/:id', auth, userCtrl.getOneUser);

// Route pour supprimer un utilisateur.
router.delete('/:id',  userCtrl.deleteUser);
// router.delete('/:id',  auth, userCtrl.deleteUser);


// Chargement du module dans l'application.
module.exports = router;