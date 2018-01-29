// Sanitizes the basic registration information. 
module.exports = function basicRegistrationSanitization(req){
    req.check('firstName').trim()
    req.check('firstName').escape()
}