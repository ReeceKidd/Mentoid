const jwt = require('jsonwebtoken')
var User = require('../models/User')

const basicRegistrationValidation = require('./validators/basicRegistration.js')

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

function notEmpty(array) {
    return array.length > 0
}

// Register User
registerController.register = (req, res) => {
    
    var errors = basicRegistrationValidation(req)

    if(errors){
        res.status(500).json({
            message: 'User registration unsuccessful',
            errors
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
    User.findById(userID, function(err, user){
        if(err){
            console.log(err)
        }
    }).select('areasOfInterest -_id').then(user => {
        
        res.status(200).send({
            areasOfInterest: user.areasOfInterest
        })
    })

}

registerController.updateAreasOfInterest = (req,res) => {
    
    updatedAreasOfInterest = req.body.areasOfInterest

    var query = {
        '_id': req.body._id
    }

    User.findOneAndUpdate(query, 
    { $set: { areasOfInterest: updatedAreasOfInterest},
      areasOfInterestRegistrationComplete: true},
      function(err, updated) {
          if(err){
              res.status(400).send({
                  message: 'Unable to update areas of interest. '
              })
          } else {
              res.status(200).send({
                message: 'Updated areas of interest.'
              }, {success: false, erros: req.session.erros})
              req.session.erros = null
          }

      }
    )

}

module.exports = registerController