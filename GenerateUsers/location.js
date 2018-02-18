const axios = require('axios')
const updateLocationURL = 'http://localhost:4000/update/location'

module.exports = async function generateSocialMedia(userID) {
    var latitude = getLatitude()
    var longitude = getLongitude()
    var location = {
        latitude: latitude,
        longitude: longitude
    }
    await axios.post(updateLocationURL, {
        userID: userID,
        location: location
    }).catch(error => {
        console.log('Could not update location: ' + error.message)
    })
    return 'Location updated'
}

/*
Range for latitudes are: -90, 90
*/
function getLatitude() {
    return Math.random() * (90.00 - (-90.00)) + (-90.00);
}

/*
Range for longitudes are: -180, 180
*/
function getLongitude() {
    return Math.random() * (180.00 - (-180.00)) + (-180.00);
}



