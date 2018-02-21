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

module.exports = getEducationHistory = (req, res) => {

    logger.debug(req.headers['x-forwarded-for'] || req.connection.remoteAddress + ' attempting to get education history ' + JSON.stringify(req.params))

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

    const userID = req.params.userID
    User.findById(userID, function (err, user) {
        if (err) {
            res.status(500)
            res.send({
                message: 'Could not get areas of interest',
                error: 'Server error'
            })
        }
    }).select('education userName -_id').then(user => {
        logger.debug(user.userName + ' successfully retrieved education: ' + JSON.stringify(user.education))
        res.status(200).send({
            education: user.education
        })
    })
}