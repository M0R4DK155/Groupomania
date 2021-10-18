module.exports.deleteAllImages = async function(idUser){
for (let i = 0; i < image_user.length; i++) {
            await Image.deleteImageStorie(image_user[i].content);
        }
        await Image.imageUser(user.avatar);
        await User.deleteUser(req.body.userId);
        await Image.deleteImage(req.body.userId);
}