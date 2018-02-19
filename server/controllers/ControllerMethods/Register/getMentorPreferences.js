var User = require('../../../models/user')

var logger = require('../../../src/logging.js')(module)

//Checks that required fields are defined.
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

// Field checkers ensure only relevant fields are passed to request
const checkForID = require('../../FieldCheckers/checkForID')

//Checks that requests are the correct type
const basicTypeCheck = require('../../TypeCheckers/Registration/basicTypeCheck')

//Sanitizes different requests
const sanitizeID = require('../../Sanitizers/userID')

// Validatiors
const userIDValidation = require('../../Validators/userID')

module.exports = getMentorPreferences = (req, res) => {

    var undefinedFields = checkUndefinedFields(req.params, ['userID'])

    if (undefinedFields) {
        logger.error(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    } 

   
    
    //Checks that fields only defined in the schema are passed. 
     var unwantedFields = checkForID(req)

     if (unwantedFields) {
        logger.error(unwantedFields)
         res.status(700).json({
             message: unwantedFields,
             error: 'Additional fields found'
         })
         return
     }
 
     //Checks that each of the fields are type string. 
     var badType = basicTypeCheck(req.params)
 
     if (badType) {
        logger.error(badType)
         res.status(850).json({
             message: badType,
             error: 'Invalid type in request'
         })
 
     }

     //Validation. 
     var errors = userIDValidation(req)
     if (errors) {
        logger.error(errors)
         res.status(600).json({
             message: errors,
             error: 'Validation failure'
         })
         return
     }
     //Santize User ID
     sanitizeID(req.params)

    const userID = req.params.userID 
    
    User.findById(userID, function (err, user) {
        if (err) {
            logger.error(err)
            res.status(500)
            res.send({
                message: 'Could not get users age',
                error: 'Server error'
            })
        }
    }).select('mentorPreferences -_id').then(user => {
        var mentoringAreaOfInterestNames = []
        var mentoringAreasOfInterest = user.mentorPreferences.mentoringAreasOfInterest
        for(var x = 0; x < mentoringAreasOfInterest.length; x++){
            var currentAreaOfInterest = mentoringAreasOfInterest[x]
            mentoringAreaOfInterestNames.push(currentAreaOfInterest.value)
        }

        console.log(mentoringAreaOfInterestNames)
        user.mentorPreferences.mentoringAreasOfInterest = mentoringAreaOfInterestNames
        
        res.status(200).send({
            mentorPreferences: user.mentorPreferences
        })
    })
}