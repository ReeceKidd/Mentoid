var User = require('../../../models/user')

// Field checkers ensure only relevant fields are passed to request
const checkBasicRegistrationFields = require('../../FieldCheckers/Registration/basicRegistration')

//Checks that requests are the correct type
const checkBasicRegistrationTypes = require('../../TypeCheckers/Registration/basicRegistration')

//Sanitizes different requests
const sanitizeBasicRegistration = require('../../Sanitizers/Registration/basicRegistration')

// Validatiors
const basicRegistrationValidation = require('../../Validators/Registration/basicRegistration')

const jwt = require('jsonwebtoken')

//JWT ISSUE TOKEN AND VERIFY
const asyncIssue = payload => {
    return new Promise((resolve, reject) => {
      const token = jwt.sign(payload, 'supersecret', { expiresIn: '1d' })
      if (token) {
        resolve(token)
      }
      reject({ error: 'There was an error signing payload' })
    })
  }
  // verify token
  const asyncVerify = token => {
    return new Promise((resolve, reject) => {
      const decoded = jwt.verify(token, 'supersecret')
      if (decoded) {
        resolve(decoded)
      }
      reject({ error: 'There was an error verifying token' })
    })
  }

module.exports = register = (req, res) =>{

    //Checks that fields only defined in the schema are passed. 
    var unwantedFields = checkBasicRegistrationFields(req)

    if (unwantedFields) {
        console.log(unwantedFields)
        res.status(700).json({
            message: unwantedField,
            error: 'Additional fields found'
        })
        return
    }

    console.log('Got past unwanted fields')

    //Validation for basic registration. 
    var errors = basicRegistrationValidation(req)
    if (errors) {
        res.status(600).json({
            message: errors,
            error: 'Validation failure'
        })
        return
    } else {
        try {
            const newUser = req.body
            newUser.areasOfInterest = []
            newUser.mentors = []
            newUser.mentees = []
            newUser.basicRegistrationComplete = true
            newUser.areasOfInterestRegistrationComplete = false
            newUser.userRegistrationComplete = false
            newUser.isUserLoggedIn = true
            const saveUser = new User(newUser)
            saveUser
                .save()
                .then(user => {
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
                    console.log(err)
                    res.status(400).send({
                        message: err.message ? err.message : 'Unable to save user to database',
                        error: 'Unable to save user.'
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