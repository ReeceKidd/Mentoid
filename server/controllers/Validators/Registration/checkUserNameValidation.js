module.exports = function userNameValidation(req){

    req.check('username', 'Invalid username').exists()
    req.check('username', 'Username must be alphanumeric and cannot contain spaces').isAlphanumeric()

    var errors = req.validationErrors(true)
    
    if(errors){
        return errors
    }
}