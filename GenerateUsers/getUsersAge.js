const axios = require('axios')
const getUserIDURL = 'http://localhost:4000/get/age/'

module.exports = async function getUserID(userAge) {
    var age
    await axios.get(getUserIDURL + userAge).then(function (response) {
      age = response.data.age
    }).catch(error => {
      console.log('Could not get Users age: ' + error)
    })

    return age
}