const isValidMongoObjectID = require('../../CustomValidators/isValidMongoObjectID')

module.exports = function getAreasOfInterestValidation(req){

    req.checkParams('userID', 'ID object should be a valid ObjectID ').custom((value) => isValidMongoObjectID(value))

    var errors = req.validationErrors(true)
    
    if(errors){
        return errors
    }
}