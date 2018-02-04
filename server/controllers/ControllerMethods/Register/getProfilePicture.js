var fs = require('fs');

module.exports = getProfilePicture = (req, res) => {
    const profilePictureDirectory = 'C:/Users/User/Desktop/Mentoid/server/profile-pictures/'
    var imagePathJPG = profilePictureDirectory + req.params.userID + '.jpg'
    var imagePathJPEG = profilePictureDirectory + req.params.userID + '.jpeg'
    var imagePathPNG = profilePictureDirectory + req.params.userID + '.png'

    if(fs.existsSync(imagePathJPG)) {
        res.sendFile(profilePictureDirectory + req.params.userID + '.jpg');
        return
    }

    if(fs.existsSync(imagePathJPEG)) {
        res.sendFile(profilePictureDirectory + req.params.userID + '.jpeg');
        return
    }

    if (fs.existsSync(imagePathPNG)) {
        res.sendFile(profilePictureDirectory + req.params.userID + '.png');
        return
    }

    res.status(500).send('Could not locate image for user: ' + req.params.userID)
}
