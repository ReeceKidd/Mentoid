module.exports = function basicRegistrationValidation(req){
    
    req.check('email', 'Must be a valid email').isEmail()
   
    var errors = req.validationErrors(true)
    
    if(errors){
        return errors
    }
}