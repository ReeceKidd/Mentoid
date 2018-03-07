var User = require('../../../../models/user')

var logger = require('../../../../src/logger.js')(module)

//Checks that required fields are defined.
const checkUndefinedFields = require('../../../UndefinedCheckers/nonArray')

// Field checkers ensure only relevant fields are passed to request
const checkForID = require('../../../FieldCheckers/checkForID')

//Checks that requests are the correct type
const basicTypeCheck = require('../../../TypeCheckers/Registration/basicTypeCheck')

//Sanitizes different requests
const sanitizeID = require('../../../Sanitizers/userID')

// Validatiors
const userIDValidation = require('../../../Validators/userID')

module.exports = getManageRelationships = (req, res) => {

    logger.warn(req.params.userID + ' is attempting to get their manage relationships details with ' + JSON.stringify(req.params))

    var undefinedFields = checkUndefinedFields(req.params, ['userID'])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    } 

    //Checks that fields only defined in the schema are passed. 
     var unwantedFields = checkForID(req)

     if (unwantedFields) {
        logger.warn(unwantedFields)
         res.status(700).json({
             message: unwantedFields,
             error: 'Additional fields found'
         })
         return
     }

     //Checks that each of the fields are type string. 
     var badType = basicTypeCheck(req.params)
 
     if (badType) {
        logger.warn(badType)
         res.status(850).json({
             message: badType,
             error: 'Invalid type in request'
         })
 
     }

     //Validation. 
     var errors = userIDValidation(req)
     if (errors) {
        logger.warn(errors)
         res.status(600).json({
             message: errors,
             error: 'Validation failure'
         })
         return
     }

    
     //Santize User ID
     sanitizeID(req.params)
    
    User.findById(req.params.userID, function (err, user) {
        if (err) {
            logger.error(err)
            res.status(500)
            res.send({
                message: 'Could not get manage relationships because of server error',
                error: 'Server error'
            })
        } 
        if(!user){
            logger.error("Could not locate user with userID: " + req.params.userID)
            res.status(500)
            res.send({
                message: 'Could not locate user with userID', 
                error: 'Could not locate error'
            })
        }

        logger.warn(user.userName + ' successfully retrieved: Matchinging information: ' +
        ' -Number of mentees: ' + user.mentees.length +
        ' -Number of mentors: ' + user.mentors.length + 
        ' -Number of potential mentors: ' + user.potentialMentors.length + 
        ' -Number of potential mentees: ' + user.potentialMentees.length + 
        ' -Number of past mentees: ' + user.pastMentees.length + 
        ' -Number of past mentors: ' + user.pastMentors.length) 
        res.status(200).send({
            mentees: user.mentees,
            mentors: user.mentors,
            potentialMentees: user.potentialMentees,
            potentialMentors: user.potentialMentors,
            pastMentees: user.pastMentees,
            pastMentors: user.pastMentors
        })
    })
}