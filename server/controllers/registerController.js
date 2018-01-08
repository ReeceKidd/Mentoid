const jwt = require('jsonwebtoken')

var User = require('../models/User')

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
    
    console.log(req.body)
    
    req.check('firstName', 'First name cannot be empty').isEmpty()
    req.check('firstName', 'First name must contain a value').equals('""')
    req.check('firstName', 'First name can only contain Alphabetical characters').isAlpha()
    req.check('firstName', 'First name must be at least two characters long').isLength({min: 2})
    
    req.check('lastName', 'Last name cannot be empty').isEmpty()
    req.check('lastName', 'Last name must contain a value').equals('""')
    req.check('lastName', 'Last name can only contain Alphabetical characters').isAlpha()
    req.check('lastName', 'Last name must be at least two characters long').isLength({min: 2})
    
    req.check('email', 'Invalid email').isEmail()
    req.check('email', 'Email cannot be empty').isEmpty()
    req.check('email', 'Email cannot be empty').equals('""')
    req.check('email', 'Email already exsits in database')
    
    req.check('password', 'Password should be eight or more characters').isLength({min: 8})
    req.check('password', 'Password cannot be empty').isEmpty()
    req.check('password', 'Password cannot be empty').equals('""')
    req.check('password', 'Password does not match confirm password').equals(req.body.confirmPassword)
    
    req.check('confirmPassword', 'Password should be eight or more characters').isLength({min: 8})
    req.check('confirmPassword', 'Password cannot be empty').isEmpty()
    req.check('confirmPassword', 'Password cannot be empty').equals('""')
    req.check('confirmPassword', 'Confirmation password does not equal password').equals(req.body.password)

    req.check('age', 'Age cannot be empty').isEmpty()
    req.check('age', 'Age cannot be empty').equals('""')
    req.check('age', 'Age must be a valid number between 5 and 120').isInt(this, {min: 5, max: 120})

    // Accepted countries must be updated if the list of accepted countries is updated. 
    var acceptedCountries = ['USA', 'UK', 'INDIA', 'GERMANY']

    req.check('country', 'Country cannot be empty').isEmpty()
    req.check('country', 'Country cannot be empty').equals('""')
    req.check('country', 'Country must be equal to one of the allowed values').isIn(this, acceptedCountries)

    req.check('terms', 'Terms field cannot be empty').isEmpty()
    req.check('terms', 'Terms field cannot be empty').equals('""')
    req.check('terms', 'The terms must be accepted to register').equals(false)
    req.check('terms', 'Terms must be a boolean value').isBoolean()

    req.check('areasOfInterest', 'areasOfInterest must be equal to an empty array').equals([])
    
    req.check('areasOfInterestRegistrationComplete', 'Areas of interest registration can not be complete at this stage').equals(false)
    req.check('areasOfInterestRegistrationComplete', 'areasOfInterestRegistrationComplete must be a boolean value').isBoolean()

    req.check('userRegistrationComplete', 'User registration cannot be complete at this stage').equals(false)
    req.check('userRegistrationComplete', 'User registration complete must be a boolean value').isBoolean()

    var errors = req.validationErrors()
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
                    user.password = user.updatedAt = user.createdAt = undefined
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