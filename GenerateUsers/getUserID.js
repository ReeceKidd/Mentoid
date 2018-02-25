const axios = require('axios')
const getUserIDURL = 'http://localhost:4000/get/userID/'

module.exports = async function getUserID(userName) {
    var userID
    await axios.get(getUserIDURL + userName).then(function (response) {
      userID = response.data.userID
    }).then(userID => {
      userID = userID
    }).catch(error => {
      console.log('Could not get User ID: ' + error)
    })

    return userID
}