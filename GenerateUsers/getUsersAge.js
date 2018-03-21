const axios = require('axios')
const getUserIDURL = 'http://localhost:4000/get/age/'

module.exports = async function getUserAge(userID) {
    var age
    await axios.get(getUserIDURL + userID).then(function (response) {
      age = response.data.age
      console.log('Successfully retreived age.')
    }).catch(error => {
      console.log('Could not get Users age: ' + error)
    })

    return age
}