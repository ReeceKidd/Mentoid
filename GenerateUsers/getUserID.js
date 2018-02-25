const axios = require('axios')
const getUserIDURL = 'http://localhost:4000/get/userID/'

module.exports = async function getUserID(userName) {
    var userID
    await axios.get(getUserIDURL + userName).then(function (response) {
      console.log(userName + ' retreived user ID ' + response.data.userID)
      userID = response.data.userID
    }).catch(error => {
      console.log(userName + ' could not get User ID: ' + error)
    })

    return userID
}