require("dotenv").config();             // Importation du paquet dotenv pour les variables d'environnement.
const express = require("express");     // Importation du paquet express.
const app = express();                  // Création de l'application express.
const cors = require('cors');           // On importe Cors.
const path = require('path');           // Importation du paquet node "path" qui donne accès au chemin du système de fichier.
const helmet = require('helmet');       // Importation du paquet helmet.

// Importation du router user.
const userRoute = require ('./routes/user');

// Importation du router post.
const postRoute = require('./routes/post');

const post = require("./controllers/posts");

// Mise en place d'un header sécurisé pour lutter contre les failles XSS.
app.use(helmet());                      

// Active CORS pour éviter les attaques CSRF - sécurisation cors: origin localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Middleware général appliqué à toutes les requêtes (CORS).
app.use((req, res, next) => {                                                                                                       
    res.setHeader('Access-Control-Allow-Origin', '*');                                                                              // Autorisation d'acceder à notre API.
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');        // Autorisation d'utiliser certains headers.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');                                        // Autorisation d'utiliser certaines méthodes.
    next();
});

app.get("/", async function (req, res) {
    await post.getAllPosts(req, res);

})

// Middleware pour traiter les données (en POST) envoyées (transforme le corps de la requête en objet javascript utilisable).
app.use(express.json());

// Middleware spécifique qui permet de servir le dossier image lors d'une requête spécifique avec l'image.
app.use('/images', express.static(path.join(__dirname, 'images')));   

// pour cette route la, on utilise le router usersRoutes
app.use('/user', userRoute);

// pour cette route la, on utilise le router publicationsRoutes
app.use('/post', postRoute);       

// On exporte la constante app pour qu'on puisse y accéder depuis les autres fichiers de notre projet, notamment notre serveur Node.
module.exports = app;