var User = require('../../../models/user')

var logger = require('../../../src/logging.js')(module);

//Checks that required fields are defined.
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

// Field checkers ensure only relevant fields are passed to request
const checkEmailField = require('../../FieldCheckers/Registration/checkEmail')

//Checks that requests are the correct type
const basicTypeCheck = require('../../TypeCheckers/Registration/basicTypeCheck')

//Sanitizes different requests
const sanitizeCheckEmail = require('../../Sanitizers/Registration/checkEmail')

// Validatiors
const checkEmailValidation = require('../../Validators/Registration/checkEmail')

module.exports = checkEmail = (req, res) =>{

    var undefinedFields = checkUndefinedFields(req.params, ['email'])

    if (undefinedFields) {
        logger.error(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    
    //Checks that fields only defined in the schema are passed. 
    var unwantedFields = checkEmailField(req)

    if (unwantedFields) {
        logger.error(unwantedFields)
        res.status(700).send({
            message: unwantedFields,
            error: 'Additional fields found'
        })
        return
    }

    //Checks that each of the fields are type string. 
    var badType = basicTypeCheck(req.params)

    if (badType) {
        logger.error(badType)
        res.status(850).send({
            message: badType,
            error: 'Invalid type in request'
        })
        return
    }

    //Validation. Cannot send status code as that spams the client console.
    var errors = checkEmailValidation(req)
    if (errors) {
        logger.error(errors)
        res.send({
            message: errors
        })
        return
    }

    //Santize input before being passed to database
    sanitizeCheckEmail(req.params)
    
    const email = req.params.email
    User.findOne({
        email: email
    }, function (err, existingEmail) {
        if (existingEmail) {
            res.status(900)
            res.send({
                message: email + ' is already registered',
                error: 'Already exists in database.'
            })
        } else if (err) {
            logger.error(err)
            res.status(500)
            res.send({
                message: 'Server error',
                error: 'Server error'
            })
        } else {
            res.status(200)
            res.send({
                message: 'Email available'
            })
        }
    })
}