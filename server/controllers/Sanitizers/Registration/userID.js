// Sanitizes the basic registration information. 
module.exports = function getAreasOfInterestSanitization(body){

    body.userID = escape(body.userID)
    body.userID = body.userID.trim()

}