module.exports = getProfilePicture = ( req, res) => {
    const profilePictureDirectory = 'C:/Users/User/Desktop/Mentoid/server/profile-pictures/'
    res.sendFile(profilePictureDirectory + req.params.userID + '.jpg');
    
}