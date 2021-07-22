
/**
 * Ajout d'un utilisateur dans la base de donnée
 *
 * @param   {Object}  user                Champs du formulaire
 * @param   {String}  user.body.prenom    Prénom de l'utilisateur
 * @param   {String}  user.body.nom       Nom de l'utilisateur
 * @param   {String}  user.body.pseudo    Pseudo de l'utilisateur
 * @param   {String}  user.body.password  Password de l'utilisateur
 * @param   {String}  user.body.email     Email de l'utilisateur
 * @param   {String}  user.body.avatar    URL du fichier
 * @param   {String}  user.body.role      Rôle de l'utilisateur 
 *
 * @return  {[type]}        [return description]
 */

async function addUser(user) {
    try {
        const res = await database.User("INSERT INTO users(prenom, nom, pseudo, password, email, avatar, id_roles) VALUES (?,?,?,?,?,?,?)", [user.body.prenom, user.body.nom, user.body.pseudo, user.body.password, user.body.email, user.file.filename, user.body.role]);
        return res;
    }
    catch (error) {
        throw ({
            status: 500,
            msg: error
        });
    }
}