module.exports = function checkEmailSanitization(body){
    
    body.email = body.email.trim()
    body.email = escape(body.email)

}