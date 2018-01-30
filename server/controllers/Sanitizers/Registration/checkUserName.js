const preventNoSQLInjection = require('../preventNoSQLInjection')
module.exports = function checkUsernameSanitization(body){
    
    body.username = body.username.trim()
    body.username = escape(body.username)
    body.username = preventNoSQLInjection(body.username)

}