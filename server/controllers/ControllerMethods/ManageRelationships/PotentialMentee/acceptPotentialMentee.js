var User = require('../../../../models/user')

var logger = require('../../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../../UndefinedCheckers/nonArray')

module.exports = acceptPotentialMentee = (req, res) => {

    //Need to put the field checkers in. 
    logger.error('Attempting to accept potential mentee with request: ' + JSON.stringify(req.body, null, 2))

    var undefinedFields = checkUndefinedFields(req.body, ['userID', 'menteeID'])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    var query = {
        '_id': req.body.userID
    }

    User.findOne({
        _id: req.body.userID
    }, function (err, user) {
        if (!user) {
            res.status(600)
            res.send({
                message: 'Could not find user with ID: ' + req.body.userID,
            })
        } else if (err) {
            logger.error(err)
            res.status(500)
            res.send({
                message: 'Server error',
                error: 'Server error'
            })
        } else {
            logger.error('Found user: ' + user.userName)
            logger.error('Attempting to find Mentee ID: ' + req.body.menteeID + 'in the potential mentees list of ' + user.potentialMentees.length + ' potential mentees')
            let acceptedPotentialMentee
            let foundAMatch = false
            user.potentialMentees.forEach((potentialMentee, index) => {

                if (potentialMentee._id == req.body.menteeID) {
                    logger.error('Found a match')
                    foundAMatch = true
                    acceptedPotentialMentee = potentialMentee
                    user.potentialMentees.splice(index, 1)
                }

            })

            logger.error('Updated potential mentees: ' + JSON.stringify(user.potentialMentees, null, 2))

            if (foundAMatch === false) {
                logger.error('No potential mentee was found with ID: ' + req.body.menteeID +
                    ' in ' + user.userName + ' list of potential mentees.')
                res.status(600).send({
                    message: 'No potential mentee was found with ID: ' + req.body.menteeID
                })
                return
            }

            User.findByIdAndUpdate(req.body.userID, {
                    $set: {
                        potentialMentees: user.potentialMentees,
                    },
                    $push: {
                        mentees: acceptedPotentialMentee
                    }
                },
                function (err, user) {
                    if (err) {
                        logger.error(err)
                        res.status(400).send({
                            message: 'Unable to update users name. Could not find user. '
                        })
                    } else if (!user) {
                        logger.error('No user found with ID: ' + req.body.userID)
                        res.status(600).send({
                            message: 'Unable to accept potential mentee.  '
                        })
                    } else {
                        logger.info(user.userName + ' accepted Mentee with ID: ' + req.body.menteeID)
                        res.status(200).send({
                            message: 'Accepted Mentee.'
                        })
                    }
                }
            )

        }
    })
}