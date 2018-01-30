const preventNoSQLInjection = require('../preventNoSQLInjection')

module.exports = function basicRegistrationSanitization(body){
    
    body.firstName = body.firstName.trim()
    body.firstName = escape(body.firstName)
    body.firstName = preventNoSQLInjection(body.firstName)

    body.lastName = body.lastName.trim()
    body.lastName = escape(body.lastName)
    body.lastName = preventNoSQLInjection(body.lastName)

    body.userName = body.userName.trim()
    body.userName = escape(body.userName)
    body.userName = preventNoSQLInjection(body.userName)

    body.email = body.email.trim()
    body.email = escape(body.email)
    body.email = preventNoSQLInjection(body.email)

    body.age = escape(body.age)
    body.age = body.age.trim()
    body.age = preventNoSQLInjection(body.age)

    /*
    Password and confirm password values do not need to be escaped as 
    they are hased afterwards and are protected as they are 
    password input. 
    */
}