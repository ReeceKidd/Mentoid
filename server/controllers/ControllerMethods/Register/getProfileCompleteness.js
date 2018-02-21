var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

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

module.exports = getUsersAge = (req, res) => {

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
                message: 'Could not find user',
                error: 'Server error'
            })
        }
    }).select('-_id userName socialMediaComplete areasOfInterestRegistrationComplete jobHistoryRegistrationComplete educationRegistrationComplete mentorPreferencesComplete menteePreferencesComplete').then(user => {
        logger.debug(user.userName + ' successfully retrieved profile completeness: ' +
            'Social Media Complete' + user.socialMediaComplete +
            'Areas of interest registration complete ' + user.areasOfInterestRegistrationComplete +
            'Job History Registration complete ' + user.jobHistoryRegistrationComplete +
            'Education Registration complete ' + user.educationRegistrationComplete +
            'Mentor preferences complete ' + user.mentorPreferencesComplete +
            'Mentee preferences complere ' + user.menteePreferencesComplete)
        res.status(200).send({
            socialMediaComplete: user.socialMediaComplete,
            areasOfInterestRegistrationComplete: user.areasOfInterestRegistrationComplete,
            jobHistoryRegistrationComplete: user.jobHistoryRegistrationComplete,
            educationRegistrationComplete: user.educationRegistrationComplete,
            mentorPreferencesComplete: user.mentorPreferencesComplete,
            menteePreferencesComplete: user.menteePreferencesComplete
        })
    })
}