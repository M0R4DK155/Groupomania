/**
 * @typedef     {Object}    simpleMessage
 * @property    {String}    msg             un message de succès ou d'erreur
 */

/**
 * @typedef     {Object}    FullUserDataFromBase
 * @property    {Number}    id
 * @property    {String}    firstname
 * @property    {String}    lastname
 * @property    {String}    pseudo
 * @property    {String}    email
 * @property    {String}    password
 * @property    {Number}    role 
 * @property    {String}    avatar
 */

/**
 * @typedef     {Object}    FullUserPostsFromBase
 * @property    {number}    id
 */
/**
 * @typedef     {Object}    FullUserCommentsFromBase
 * @property    {number}    id
 */

/**
 * les données d'une publication.
 * @typedef     {Object}    postData
 * @property    {String}    [id]
 * @property    {String}    idAuthor
 * @property    {String}    message
 * @property    {String}    [image]
 * @property    {Date}      [date]
 */

/**
 * Les données d'un commentaire sur une publication.
 * @typedef     {Object}    commentData
 * @property    {String}    [id]
 * @property    {String}    idAuthor
 * @property    {String}    message
 * @property    {String}    image
 * @property    {Date}      date
 * @property    {String}    idPost
 */

module.exports = {};