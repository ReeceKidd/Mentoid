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
    console.log('Username ' + req + 'is being checked for')
    const username = req.params.username
    User.findOne({
        userName: username
    }, function (err, existingUser) {
        if (existingUser) {
            res.sendStatus(400)
        } else {
            res.sendStatus(200)
        }
    })
}

registerController.checkEmail = (req, res) => {
    const email = req.params.email
    User.findOne({
        email: email
    }, function (err, existingUser) {
        if (existingUser) {
            res.sendStatus(400)
        } else {
            res.sendStatus(200)
        }
    })
}

// Register User
registerController.register = (req, res) => {
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

module.exports = registerController