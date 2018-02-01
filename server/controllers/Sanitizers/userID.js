module.exports = function getAreasOfInterestSanitization(body){

    body.userID = escape(body.userID)
    body.userID = body.userID.trim()

}