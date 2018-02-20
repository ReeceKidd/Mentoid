/*
Earths radius: 6371
Source: https://www.google.co.uk/search?q=earth%27s+radius+in+kilometers&oq=earths+radius+in+kilome&aqs=chrome.1.69i57j0l5.7463j0j7&sourceid=chrome&ie=UTF-8
*/

/*
Calculates the distance between one customer to another in Kilometres using this equation: 
https://en.wikipedia.org/wiki/Great-circle_distance
*/


const earthsRadius = 6371

function degrees_to_radians(degrees) {
    return degrees * Math.PI / 180
}

module.exports = function calculateDistanceFromDublinOffice(userLocationInformation, matchedUserLocation) {

    var userLatitude = userLocationInformation.latitude
    var userLongitude = userLocationInformation.longitude

    var matchedLatitude = matchedUserLocation.latitude
    var matchedLongitude = matchedUserLocation.longitude

    const central_angle = Math.acos(
        Math.sin(degrees_to_radians(userLatitude)) * Math.sin(degrees_to_radians(matchedLatitude)) +
        Math.cos(degrees_to_radians(userLatitude)) * Math.cos(degrees_to_radians(matchedLatitude)) 
        * Math.cos(degrees_to_radians(userLongitude) - degrees_to_radians(matchedLongitude))
    )

    const distance = earthsRadius * central_angle
    var intKMDistance = Math.round(distance);
    return intKMDistance
}
