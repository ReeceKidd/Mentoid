module.exports = function checkUsernameSanitization(body){
    
    body.username = body.username.trim()
    body.username = escape(body.username)

}