const axios = require('axios')
const getUserAgeURL = 'http://localhost:4000/get/age/'

module.exports = async function getUserID(userName, userAge) {
    var age
    await axios.get(getUserAgeURL + userAge).then(function (response) {
      console.log(userName + ' retrieved user age: ' + userAge)
      age = response.data.age
    }).catch(error => {
      console.log('Could not get Users age: ' + error)
    })

    return age
}