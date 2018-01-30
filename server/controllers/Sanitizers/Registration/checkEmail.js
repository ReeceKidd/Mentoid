// Sanitizes the basic registration information. 
module.exports = function basicRegistrationSanitization(body){
    
    body.email = body.email.trim()
    body.email = escape(body.email)

}