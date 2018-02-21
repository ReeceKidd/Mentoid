var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

//Checks that required fields are defined.
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

// Field checkers ensure only relevant fields are passed to request
const checkUserNameField = require('../../FieldCheckers/Registration/checkUserName')

//Checks that requests are the correct type
const basicTypeCheck = require('../../TypeCheckers/Registration/basicTypeCheck')

//Sanitizes different requests
const sanitizeUserName = require('../../Sanitizers/Registration/checkUserName')

// Validatiors
const checkUserNameValidation = require('../../Validators/Registration/checkUserNameValidation')

module.exports = checkUserName = (req, res) => {

    var undefinedFields = checkUndefinedFields(req.params, ['username'])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    //Checks that fields only defined in the schema are passed. 
    var unwantedFields = checkUserNameField(req)

    if (unwantedFields) {
        logger.warn(unwantedFields)
        res.status(700).send({
            message: unwantedFields,
            error: 'Additional fields found'
        })
        return
    }

    //Checks that each of the fields are type string. 
    var badType = basicTypeCheck(req.params)

    if (badType) {
        logger.warn(badType)
        res.status(850).send({
            message: badType,
            error: 'Invalid type in request'
        })
        return
    }

    //Validation. 
    var errors = checkUserNameValidation(req)
    logger.warn(errors)
    if (errors) {
        res.send({
            message: errors
        })
        return
    }

    //Santize input before being passed to database
    sanitizeUserName(req.params)

    const username = req.params.username
    User.findOne({
        userName: username
    }, function (err, user) {
        if (err) {
            logger.error(err)
            res.status(500)
            res.send({
                message: 'Server error',
                error: 'Server error'
            })
            return
        } else if (user) {
            logger.warn(username + 'is already registered')
            res.status(900)
            res.send({
                message: username + ' is already registered',
                error: 'Already exists in database.'
            })
            return
        } else {
            logger.debug(username + ' was entered into basic registration field.')
            res.status(200)
            res.send({
                message: 'Username ' + username + ' is available'
            })
        }
    })
}