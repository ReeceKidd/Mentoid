const jwt = require('jsonwebtoken')
var User = require('../models/User')

//Checks that requests don't receive unwanted properties. 
const checkFields = require('./validators/checkFields.js')

//Checks for duplication of values in array.
const duplicationChecker = require('./validators/duplicationChecks.js')

// Validatiors
const basicRegistrationValidation = require('./validators/basicRegistrationValidation.js')
const updateAreasOfInterestValidation = require('./validators/updateAreasOfInterestValidation.js')

const registerController = {}

//JWT ISSUE TOKEN AND VERIFY
const asyncIssue = payload => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign(payload, 'supersecret', {
            expiresIn: '1d'
        })
        if (token) {
            resolve(token)
        }
        reject({
            error: 'There was an error signing payload'
        })
    })
}
// verify token
const asyncVerify = token => {
    return new Promise((resolve, reject) => {
        const decoded = jwt.verify(token, 'supersecret')
        if (decoded) {
            resolve(decoded)
        }
        reject({
            error: 'There was an error verifying token'
        })
    })
}

registerController.checkUserName = (req, res) => {
    console.log('Username ' + req.params.username + ' is being checked for')
    const username = req.params.username
    User.findOne({
        userName: username
    }, function (err, existingUser) {
        if (existingUser) {
            res.send('Username already exists')
        } else {
            res.send('Username is available')
        }
    })
}

registerController.checkEmail = (req, res) => {
    const email = req.params.email
    User.findOne({
        email: email
    }, function (err, existingEmail) {
        console.log('Checking if ' + req.body + ' exists in database')
        if (existingEmail) {
            res.send('Email already exists')
        } else {
            res.send('Email is available')
        }
    })
}

// Register User
registerController.register = (req, res) => {

    //Checks that fields only defined in the schema are passed. 
    var unwantedField = checkFields.basicRegistration(req)

    if(unwantedField) {
        res.status(500).json({
            message: unwantedField,
            error: 'Additional fields found'
        })
        return
    }

    //Validation for basic registration. 
    var errors = basicRegistrationValidation(req)

    if (errors) {
        res.status(500).json({
            message: 'User registration unsuccessful',
            error: 'Validation failure'
        })
    } else {
        try {
            const newUser = new User(req.body)
            newUser
                .save()
                .then(user => {
                    // Fields not to be returned. 
                    user.password = user.updatedAt = user.createdAt = user.confirmPassword = undefined
                    const token = asyncIssue(user.toObject()).then(token => {
                        res.status(200).send({
                            message: 'Success',
                            token: token,
                            user: user
                        })
                    })
                })
                .catch(err => {
                    res.status(400).send({
                        message: err.message ? err.message : 'Unable to save user to database'
                    })
                })
        } catch (err) {
            const message = err.message ? err.message : 'There was an error'
            res.status(401).send({
                message: message
            })
        }
    }
}

registerController.getAreasOfInterest = (req, res) => {
    const userID = req.params.userID
    User.findById(userID, function (err, user) {
        if (err) {
            console.log(err)
        }
    }).select('areasOfInterest -_id').then(user => {

        res.status(200).send({
            areasOfInterest: user.areasOfInterest
        })
    })

}

registerController.updateAreasOfInterest = (req, res) => {

    //Checks that only _id and areas of interest are passed in request. 
    var unwantedField = checkFields.updateAreasOfInterest(req)

    if(unwantedField) {
        res.status(500).json({
            message: unwantedField
        })
        return
    }

    //Checks that there are no duplicate values for the areas of interest

    var duplicatedAreaOfInterestValues = duplicationChecker.checkForDuplicates(req.body.areasOfInterest)

    if(duplicatedAreaOfInterestValues){
        res.status(500).json({
            message: 'Please do not enter the same area of interest more than once. '
        })
        return
    }
    
    //Validation for updating areas of interest. 
    var errors = updateAreasOfInterestValidation(req)

    if (errors) {
        res.status(500).json({
            message: 'Unable to update users area of interest',
            errors
        })
    } else {

       var updatedAreasOfInterest = req.body.areasOfInterest

        var query = {
            '_id': req.body._id
        }

        User.findOneAndUpdate(query, {
                $set: {
                    areasOfInterest: updatedAreasOfInterest
                },
                areasOfInterestRegistrationComplete: true
            },
            function (err, updated) {
                if (err) {
                    res.status(400).send({
                        message: 'Unable to update areas of interest. Could not find user. '
                    })
                } else {
                    res.status(200).send({
                        message: 'Updated areas of interest successfully.'
                    })
                }
            }
        )
    }



}

module.exports = registerController