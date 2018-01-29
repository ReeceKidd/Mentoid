module.exports = function checkBasicRegistrationFields(req) {
    for (property in req.body) {
        if (property !== 'firstName' && 
            property !== 'lastName' &&
            property !== 'userName' && 
            property !== 'email' && 
            property !== 'password' &&
            property !== 'age' && 
            property !== 'confirmPassword' && 
            property !== 'language' &&
            property !== 'terms') {
            return 'Request contained unsupported field: ' + property
        }
    }
}