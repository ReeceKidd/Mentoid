var User = require('../../../models/user')

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
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    } 
    
    //Checks that fields only defined in the schema are passed. 
     var unwantedFields = checkForID(req)

     if (unwantedFields) {
         res.status(700).json({
             message: unwantedFields,
             error: 'Additional fields found'
         })
         return
     }
 
     //Checks that each of the fields are type string. 
     var badType = basicTypeCheck(req.params)
 
     if (badType) {
         res.status(850).json({
             message: badType,
             error: 'Invalid type in request'
         })
 
     }
 
     //Validation. 
     var errors = userIDValidation(req)
     if (errors) {
         res.status(600).json({
             message: errors,
             error: 'Validation failure'
         })
         return
     }
 
     //Santize User ID
     sanitizeID(req.params)
    
    
    const userID = req.params.userID
    var query = {
        _id: userID
    }
    User.findOne(query, function (err, user) {
        if (err) {
            res.status(500)
            res.send({
                message: 'Could not get users age',
                error: 'Server error'
            })
        }
    }).select('age -_id').then(user => {
        res.status(200).send({
            age: user.age
        })
    })
}