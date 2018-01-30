// Sanitizes the basic registration information. 
module.exports = function basicRegistrationSanitization(body){
    
    body._id = body._id.trim()
    body._id = escape(body._id)

}