var fs = require('fs');
var logger = require('../../../src/logger.js')(module)

module.exports = getProfilePicture = (req, res) => {

    logger.debug(req.headers['x-forwarded-for'] || req.connection.remoteAddress + ' attempting to get profile picture with request ' + JSON.stringify(req.params))

    const profilePictureDirectory = 'C:/Users/User/Desktop/Mentoid/server/profile-pictures/'
    const noProfilePictueAvatar = 'C:/Users/User/Desktop/Mentoid/server/assets/userAvatar.png'
    var userID = req.params.userID
    var imagePathJPG = profilePictureDirectory + userID + '.jpg'
    var imagePathJPEG = profilePictureDirectory + userID + '.jpeg'
    var imagePathPNG = profilePictureDirectory + userID + '.png'

    if(fs.existsSync(imagePathJPG)) {
        logger.debug('User: ' + userID + ' retreived profile picture ' + userID + '.jpg')
        res.sendFile(profilePictureDirectory + userID + '.jpg');
        return
    }

    if(fs.existsSync(imagePathJPEG)) {
        logger.debug('User: ' + userID + ' retreived profile picture ' + userID + '.jpeg')
        res.sendFile(profilePictureDirectory + userID + '.jpeg');
        return
    }

    if (fs.existsSync(imagePathPNG)) {
        logger.debug('User: ' + userID + ' retreived profile picture ' + userID + '.png')
        res.sendFile(profilePictureDirectory + userID + '.png');
        return
    }

    logger.debug('User: ' + userID + ' does not have a profile picture resorting to avatar.')
    res.sendFile(noProfilePictueAvatar)
}
