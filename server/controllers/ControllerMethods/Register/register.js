var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

//Checks that required fields are defined.
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

// Field checkers ensure only relevant fields are passed to request
const checkBasicRegistrationFields = require('../../FieldCheckers/Registration/basicRegistration')

//Checks that requests are the correct type
const basicTypeCheck = require('../../TypeCheckers/Registration/basicTypeCheck')

//Check for null values
const checkForNull = require('../../NullChecker/checkForNull')

//Sanitizes different requests
const sanitizeBasicRegistration = require('../../Sanitizers/Registration/basicRegistration')

// Validatiors
const basicRegistrationValidation = require('../../Validators/Registration/basicRegistration')

const jwt = require('jsonwebtoken')

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

module.exports = register = (req, res) => {
    
    logger.debug(req.headers['x-forwarded-for'] || req.connection.remoteAddress + ' attempting to register with request ' + JSON.stringify(req.body))

    var undefinedFields = checkUndefinedFields(req.body, [
        'firstName',
        'lastName',
        'userName',
        'email',
        'password',
        'confirmPassword',
        'age',
        'country',
        'terms'
    ])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    //Checks that fields only defined in the schema are passed. 
    var unwantedFields = checkBasicRegistrationFields(req)

    if (unwantedFields) {
        logger.warn(unwantedFields)
        res.status(700).json({
            message: unwantedFields,
            error: 'Additional fields found'
        })
        return
    }

    var nullPresent = checkForNull(req.body)

    if (nullPresent) {
        logger.warn(nullPresent)
        res.status(975).json({
            message: nullPresent,
            error: 'Null value present'
        })
        return
    }

    //Checks that each of the fields are type string. 
    var badType = basicTypeCheck(req.body)

    if (badType) {
        logger.warn(badType)
        res.status(850).json({
            message: badType,
            error: 'Invalid type'
        })
        return
    }

    //Validation for basic registration. 
    var errors = basicRegistrationValidation(req)
    if (errors) {
        logger.warn(errors)
        res.status(600).json({
            message: errors,
            error: 'Validation failure'
        })
        return
    }
    //Santize input before being passed to database
    sanitizeBasicRegistration(req.body)
    try {
        const newUser = req.body
        newUser.areasOfInterest = []
        newUser.mentors = []
        newUser.mentees = []
        newUser.potentialMentors = [],
        newUser.potentialMentees = [],
        newUser.potentialMentees = [],
        newUser.pastMentors = [],
        newUser.location = {
            "longitude" : 79.7224003699525,
            "latitude" : 78.1255953282639
        }
        newUser.basicRegistrationComplete = true
        newUser.areasOfInterestRegistrationComplete = false
        newUser.userRegistrationComplete = false
        newUser.isUserLoggedIn = true
        const saveUser = new User(newUser)
        saveUser
            .save()
            .then(user => {
                /*
                User information is adapted here to hide sensitive information and to aid with the 
                matching algorithm. 
                */
                //Undefined for user safety. 
                user.password = user.updatedAt = user.createdAt = user.confirmPassword = undefined
                user.mentorPreferences = {
                    wouldLikeAMentee: true,
                    prefferedMentoringFormats: ['Online', 'In person'],
                    maximumTravelDistanceKM: 50,
                    languages: [user.language],
                    prefferedEducation: ['High School','Vocational','Certification','Bachelors','Masters','PHD'],
                    minimumAge: 16,
                    maximumAge: 120,
                    maxNumberOfMentees: 10
                  }
                  user.menteePreferences = {
                    wouldLikeAMentor: true,
                    prefferedMentoringFormats: ['Online', 'In person'],
                    maximumTravelDistanceKM: 50,
                    languages: [user.language],
                    prefferedEducation: ['High School','Vocational','Certification','Bachelors','Masters','PHD'],
                    minimumAge: 16,
                    maximumAge: 120,
                    maxNumberOfMentees: 10
                  }
                const token = asyncIssue(user.toObject()).then(token => {
                    logger.info(user.userName + ' successfully registered: ' + user)
                    res.status(200).send({
                        message: 'Success',
                        token: token,
                        user: user
                    })
                })
            })
            .catch(err => {
                logger.error(err)
                res.status(400).send({
                    message: err.message ? err.message : 'Unable to save user to database',
                    error: 'Unable to save user.'
                })
            })
    } catch (err) {
        const message = err.message ? err.message : 'There was an error'
        logger.error(err)
        res.status(401).send({
            message: message
        })
    }
}