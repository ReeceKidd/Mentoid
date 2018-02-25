const generatedPicturesDirectory = './ProfilePictures/';
const profilePicturesDirectory = '../server/profile-pictures/'
const fs = require('fs');

/*
This selects a random image from the generated pictures directory and assigns it to a user
via making a copy of it, renaming it with the user ID and moving it to the profile pictures 
directory. 
*/

module.exports = function assignPictureToUser(userID, userName) {
    var files = fs.readdirSync(generatedPicturesDirectory)
    var randomIndex = Math.floor(Math.random() * files.length) + 1
    var randomFile = generatedPicturesDirectory + files[randomIndex]
    fs.writeFileSync(profilePicturesDirectory + userID + '.jpg', fs.readFileSync(randomFile));
    
}