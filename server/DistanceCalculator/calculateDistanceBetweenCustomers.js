/*
Earths radius: 6371
Source: https://www.google.co.uk/search?q=earth%27s+radius+in+kilometers&oq=earths+radius+in+kilome&aqs=chrome.1.69i57j0l5.7463j0j7&sourceid=chrome&ie=UTF-8
*/

/*
Calculates the distance between one customer to another in Kilometres using this equation: 
https://en.wikipedia.org/wiki/Great-circle_distance
*/
const distanceCalculator = {}

const earthsRadius = 6371

function degrees_to_radians(degrees) {
    return degrees * Math.PI / 180
}

distanceCalculator.calculateDistanceFromDublinOffice = function(userLocationInformation, matchedUserLocationInformation){

    var userLatRadian = degrees_to_radians(userLocationInformation.latitude)
    var userLongRadian = degrees_to_radians(userLocationInformation.longitude) 

    var matchedUserLatRadian = degrees_to_radians(matchedUserLocationInformation.latitude)
    var matchedUserLongRadian = degrees_to_radians(matchedUserLocationInformation.longitude)

    const central_angle = Math.acos(
        Math.sin(userLatRadian) * Math.sin(matchedUserLatRadian) +
        Math.cos(userLatRadian) * Math.cos(matchedUserLatRadian) 
        * Math.cos(degrees_to_radians(userLongRadian) - degrees_to_radians(matchedUserLongRadian))
    )

    const distance = earthsRadius * central_angle
    return distance
}

module.exports = distanceCalculator