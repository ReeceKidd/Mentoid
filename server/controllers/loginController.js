

const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var User = require('../models/User')

const userController = {}

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

  

  userController.login = (req, res) => {
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
                    .status(400)
                    .send({ message: 'Invalid Username or Password' })
                }
              }
            })
          } else {
            // user does not exist
            res.status(400).send({ message: 'Not a registered User' })
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
  }
    
module.exports = userController