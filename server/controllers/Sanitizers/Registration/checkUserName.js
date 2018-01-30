// Sanitizes the basic registration information. 
module.exports = function basicRegistrationSanitization(body){
    
    body.username = body.username.trim()
    body.username = escape(body.username)

}