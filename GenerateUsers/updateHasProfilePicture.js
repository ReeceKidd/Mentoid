const axios = require('axios')
const updateHasProfilePictureURL = 'http://localhost:4000/generate/update-has-profile-picture'
module.exports = function updateHasProfilePicture(userID){
    axios.post(updateHasProfilePictureURL, {
        userID: userID
    }).catch(error => {
        console.log(userName + ' could not update has profile picture value: ' + error.message)
    })
}