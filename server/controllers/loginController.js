var express = require('express')
var app = express()
var loginController = express.Router()
const bcrypt = require('bcryptjs')

loginController.login = (req, res) =>  {
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
  }

  module.exports = loginController