module.exports = function socialMediaValidation(req) {

    /*
    Social Media does not require any validation as of yet as the fields are optional. 
    */

    var errors = req.validationErrors(true)

    if (errors) {
        return errors
    }
}