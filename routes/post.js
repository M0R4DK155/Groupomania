// Fichier contenant notre logique de routing - Publication.
const express = require('express');
const router = express.Router();                        // Appel du routeur avec la méthode mise à disposition par Express.
const auth = require('../middlewares/auth');            // Sécurisation des routes. (schéma d'authentification de type Bearer)
const multer = require('../middlewares/multer-config'); // Package permettant le téléchargement de fichier.
const postCtrl = require('../controllers/post');        // Importation du controller.

// C // Route pour ajouter une publication - Création d'une publication et l'enregistre dans la BDD. (d'abord auth, ensuite multer, sinon requête pas authentifiée)
router.post('/create', auth, multer, postCtrl.createPost); 

// R // Route pour récupérer toutes publications - Renvoie le tableau de toutes les publications dans la BDD.
router.get('/', auth, postCtrl.getAllPosts);             

// R // Route pour récupérer une publication spécifique - Renvoie la publication avec l'id fourni.
router.get('/:id', auth, postCtrl.getOnePost);           

// U // Route pour modifier une publication - Modification d'une publication avec l'identifiant fourni.
router.put('/:id/update', auth, multer, postCtrl.modifyPost);   

// D // Route pour supprimer un post spécifique - Suppression la publication avec l'id fourni.
router.delete('/:id/delete', auth, multer, postCtrl.deletePost);

    

module.exports = router;