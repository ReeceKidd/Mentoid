var User = require('../../../models/user')

// Field checkers ensure only relevant fields are passed to request
const checkUserNameField = require('../../FieldCheckers/Registration/checkUserName')

//Checks that requests are the correct type
const checkUserNameTypes = require('../../TypeCheckers/Registration/checkUserName')

//Sanitizes different requests
const sanitizeUserName = require('../../Sanitizers/Registration/checkUserName')

// Validatiors
const checkUserNameValidation = require('../../Validators/Registration/checkUserNameValidation')

module.exports = checkUserName = (req, res) => {

    //Checks that fields only defined in the schema are passed. 
    var unwantedFields = checkUserNameField(req)

    if (unwantedFields) {
        res.status(700).json({
            message: unwantedFields,
            error: 'Additional fields found'
        })
        return
    }

    //Checks that each of the fields are type string. 
    var badType = checkUserNameTypes(req.params)

    if (badType) {
        console.log(badType)
        res.status(850).json({
            message: badType,
            error: 'Invalid type in request'
        })

    }

    //Santize input before being passed to database
    sanitizeUserName(req.params)

    const username = req.params.username
    User.findOne({
        userName: username
    }, function (err, existingUser) {
        if (existingUser) {
            res.status(900)
            res.send({
                message: username + ' is already registered',
                error: 'Already exists in database.'
            })
            return
        } if (err) {
            res.status(500)
            res.send({
                message: 'Server error',
                error: 'Server error'
            })
            return
        } else {
            res.status(200)
            res.send({
                message: 'Username ' + username + ' is available' 
            })
        }
    })
}