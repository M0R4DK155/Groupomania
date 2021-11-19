// Base P6
// Importation du paquet multer permettant le téléchargement d'images
const multer = require('multer');       

// Bibliothèque des mime types possible
const MIME_TYPES = {        
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// fonction de multer qui permet d'enregistrer sur le disque
const storage = multer.diskStorage({                    
    destination: (req, file, callback)=> {                      // La destination est une fonction qui va expliquer à multer dans quel dossier enregistrer le fichier
        callback(null, 'images')                                // null pour pas d'erreur et le nom du dossier
    },
    filename: (req, file, callback) => {                        // Explique à multer quel nom de fichier utiliser
        const name = file.originalname.split(' ').join('_');    // On prend le nom d'origine et on split (remplace) les espace par des '_' pour éviter les bugs
        const extension = MIME_TYPES[file.mimetype];            // On récupère le mime type du fichier pour créer l'extension correspondante
        callback(null, name + Date.now() + '.' + extension);    // null pour pas d'erreur, nom du fichier, la date précise (sorte de cachet de la poste pour le rendre le plus unique possible) pour éviter le doublons, le '.' et l'extension
    }
});

// Méthode multer à laquelle on passe notre objet Storage et méthode single pour préciser un seul fichier image
module.exports = multer({
  storage: storage,
  limits: { fileSize: 2000000 } //Limite la taille du fichier à 2Mo max

}).single('image');
