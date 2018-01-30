module.exports = function emailValidation(req){

    req.checkParams('email', 'Invalid email').isEmail()

    var errors = req.validationErrors(true)
    
    if(errors){
        return errors
    }
}