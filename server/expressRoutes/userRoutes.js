var express = require('express')
var app = express()
var userRoutes = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var User = require('../models/User')

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

/////////////////////////////////////
////////// OLD ROUTE /////////////////
/////////////////////////////////////
// Defined get data(index or listing) route
userRoutes.route('/').get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err)
    } else {
      res.json(users)
    }
  })
})

///////////////////////////////////
////////////// NEW ROUTES ////////////
///////////////////////////////////

userRoutes.get('/check/username/:username', function(req, res) {
  const username = req.params.username
  User.findOne({ userName: username }, function(err, existingUser) {
    if (existingUser) {
      res.sendStatus(400)
    } else {
      res.sendStatus(200)
    }
  })
})

userRoutes.get('/check/email/:email', function(req, res) {
  const email = req.params.email
  User.findOne({ email: email }, function(err, existingUser) {
    if (existingUser) {
      res.sendStatus(400)
    } else {
      res.sendStatus(200)
    }
  })
})

///////////////////////////////
///////// USER LOGIN ///////////
////////////////////////////////
userRoutes.post('/login', function(req, res) {
  try {
    var formData = req.body
    User.findOne({ email: formData.email })
      .then(user => {
        if (user) {
          // compare password
          bcrypt.compare(formData.password, user.password, (error, result) => {
            if (error) {
              throw Error('Invalid Username or Password')
            } else {
              if (result) {
                user.password = undefined
                asyncIssue(user.toObject())
                  .then(token => {
                    res.status(200).send({
                      message: 'Success',
                      token: token,
                      user: user
                    })
                  })
                  .catch(error => {
                    const message = error.message
                      ? error.message
                      : 'There was an error'
                    res.status(400).send({
                      message: message
                    })
                  })
              } else {
                res
                  .status(401)
                  .send({ message: 'Invalid Username or Password' })
              }
            }
          })
        } else {
          // user does not exist
          res.status(404).send({ message: 'Not a registered User' })
        }
      })
      .catch(err => {
        res
          .status(400)
          .send({ message: err.message ? err.message : 'There was an error' })
      })
  } catch (err) {
    const message = err.message ? err.message : 'There was an error'
    res.status(400).send({
      message: message
    })
  }
})

///////////////////////////////
///////// USER REGISTER ///////////
////////////////////////////////
userRoutes.post('/register', (req, res) => {
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
})

userRoutes.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    res.status(200).send({
      message: 'SUPER SECRET'
    })
  }
)

module.exports = userRoutes
