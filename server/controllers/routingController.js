
var User = require('../models/User')

const routingController = {}

// Returns a list of all users
routingController.getBasicRegistrationCompleteValue = (req, res) => {
        const userID = req.params.userID
        User.findById(userID, function (err, user) {
            if (err) {
                res.status(500)
                res.send({
                    message: 'Could not get basic registration value',
                    error: 'Server error'
                })
            }
        }).select('basicRegistrationComplete -_id').then(user => {
            res.status(200).send({
                basicRegistrationComplete: user.basicRegistrationComplete
            })
        })
    }

routingController.getAreasOfInterestRegistrationCompleteValue = (req, res) => {
        const userID = req.params.userID
        User.findById(userID, function (err, user) {
            if (err) {
                res.status(500)
                res.send({
                    message: 'Could not get areas of interest registration complete value',
                    error: 'Server error'
                })
            }
        }).select('areasOfInterestRegistrationComplete -_id').then(user => {
            res.status(200).send({
                areasOfInterestRegistrationComplete: user.areasOfInterestRegistrationComplete
            })
        })
    }

module.exports = routingController