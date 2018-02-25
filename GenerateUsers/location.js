const axios = require('axios')
const updateLocationURL = 'http://localhost:4000/update/location'

/*
Valid Range for latitudes are: -90, 90
Latitudes are limited in this so users have a higher chanc of being in range of each other. 
*/
var maxLatitude = 80
var minLatitude = 78

/*
Range for longitudes are: -180, 180
*/
var maxLongitude = 80
var minLongitude = 78

module.exports = async function generateLocation(userName, userID) {
    var latitude = getLatitude()
    var longitude = getLongitude()
    var location = {
        latitude: latitude,
        longitude: longitude
    }
    await axios.post(updateLocationURL, {
        userID: userID,
        location: location
    })
    .catch(error => {
        console.log('Could not update location: ' + error.message)
    })
    return userName
}


function getLatitude() {
    return Math.random() * (maxLatitude - minLatitude) + (minLatitude);
}


function getLongitude() {
    return Math.random() * (maxLongitude - minLongitude) + (minLongitude);
}



