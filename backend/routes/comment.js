// Fichier contenant notre logique de routing - Commenter une publication
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config'); // Package permettant le téléchargement de fichier.
const commentCtrl = require('../controllers/comment');

// C // Route pour ajouter un commentaire - Création d'un commentaire et l'enregistre dans la BDD. (d'abord auth, ensuite multer, sinon requête pas authentifiée)
router.post('/', auth, multer, commentCtrl.createComment);        

// R // Route pour récupérer tous les commentaires - Renvoie le tableau de tous les commentaires dans la BDD.
router.get('/', auth, commentCtrl.getAllComments);             

// R // Route pour récupérer un commentaire spécifique - Renvoie le commentaire avec l'id fourni.
router.get('/:id', auth, commentCtrl.getOneComment);           

// U // Route pour modifier un commentaire spécifique - Modification d'un commentaire avec l'id fourni.
router.put('/:id', auth, multer, commentCtrl.modifyComment);   

// D // Route pour supprimer un commentaire spécifique - Supprime le commentaire avec l'id fourni.
router.delete('/:id', auth, multer, commentCtrl.deleteComment);        

module.exports = router;