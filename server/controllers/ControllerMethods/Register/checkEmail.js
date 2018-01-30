var User = require('../../../models/user')

// Field checkers ensure only relevant fields are passed to request
const checkEmailField = require('../../FieldCheckers/Registration/checkEmail')

//Checks that requests are the correct type
const checkEmailTypes = require('../../TypeCheckers/Registration/checkEmail')

//Sanitizes different requests
const sanitizeCheckEmail = require('../../Sanitizers/Registration/checkEmail')

// Validatiors
const checkEmailValidation = require('../../Validators/Registration/checkEmail')

module.exports = checkEmail = (req, res) =>{

    //Checks that fields only defined in the schema are passed. 
    var unwantedFields = checkEmailField(req)

    if (unwantedFields) {
        res.status(700).json({
            message: unwantedFields,
            error: 'Additional fields found'
        })
        return
    }

    //Checks that each of the fields are type string. 
    var badType = checkEmailTypes(req.params)

    if (badType) {
        console.log(badType)
        res.status(850).json({
            message: badType,
            error: 'Invalid type in request'
        })

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
                message: 'Email already exists',
                error: 'Already exists in database.'
            })
        } else if (err) {
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