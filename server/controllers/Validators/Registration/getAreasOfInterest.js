const isValidMongoObjectID = require('../../CustomValidators/isValidMongoObjectID')

module.exports = function getAreasOfInterestValidation(req){

    console.log(req)
    
    req.check('_id', 'ID object should be a valid ObjectID ').custom(val, isValidMongoObjectID)

    var errors = req.validationErrors(true)
    
    if(errors){
        return errors
    }
}