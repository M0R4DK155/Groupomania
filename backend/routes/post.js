// Base P6
// Fichier contenant notre logique de routing
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const postsCtrl = require('../controllers/posts');


// C // Route pour ajouter une sauce - Création d'une sauce et l'enregistre dans la BDD. (d'abord auth, ensuite multer, sinon requête pas authentifiée)
router.post('/', auth, multer, postsCtrl.createPost);

// C // Route pour liker ou disliker une sauce - Like/dislike d'une sauce.
router.post('/:id/like', auth, postsCtrl.like);            

// R // Route pour récupérer toutes les sauces - Renvoie le tableau de toutes les sauces dans la BDD.
router.get('/', auth, postsCtrl.getAllPosts);             

// R // Route pour récupérer une sauce spécifique - Renvoie la sauce avec l'id fourni.
router.get('/:id', auth, postsCtrl.getOnePost);           

// U // Route pour modifier une sauce spécifique - Modification d'une sauce avec l'identifiant fourni.
router.put('/:id', auth, multer, postsCtrl.modifyPost);   

// D // Route pour supprimer une sauce spécifique - Supprime la sauce avec l'id fourni.
router.delete('/:id', auth, multer, postsCtrl.deletePost);        


module.exports = router;