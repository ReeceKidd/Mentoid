module.exports = function emailValidation(req){
    
    req.check('email', 'Invalid email').isEmail()

    var errors = req.validationErrors(true)
    
    if(errors){
        return errors
    }
}