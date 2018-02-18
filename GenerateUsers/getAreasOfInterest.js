const axios = require('axios')
const getAreasOfInterestURL = 'http://localhost:4000/get/areas-of-interest/'

module.exports = async function getAreasOfInterest(userID) {
    var areasOfInterest
    await axios.get(getAreasOfInterestURL + userID).then(function (response) {
      areasOfInterest = response.data.areasOfInterest
    }).catch(error => {
      console.log('Could not get areas of interest: ' + error)
    })

    return areasOfInterest
}

