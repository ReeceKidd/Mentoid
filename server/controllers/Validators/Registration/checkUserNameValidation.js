module.exports = function userNameValidation(req){

    req.checkParams('username', 'Invalid username').exists()
    req.checkParams('username', 'Username must be alphanumeric and cannot contain spaces').isAlphanumeric()

    var errors = req.validationErrors(true)
    
    if(errors){
        return errors
    }
}