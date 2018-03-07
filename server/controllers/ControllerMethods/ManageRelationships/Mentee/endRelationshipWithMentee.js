var User = require('../../../../models/user')

var logger = require('../../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../../UndefinedCheckers/nonArray')

module.exports = endRelationshipWithMentee = (req, res) => {

    //Need to put the field checkers in. 
    logger.error('Attempting to end relationship with mentee with request: ' + JSON.stringify(req.body, null, 2))

    var undefinedFields = checkUndefinedFields(req.body, ['userID', 'menteeID'])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    User.findById(req.body.userID,
    function (err, user) {
        if (err) {
            logger.error(err)
            res.status(500).send({
                message: 'Unable to end relationship with mentee. Server error. '
            })
        } else if(!user) {
            logger.error('Could not find user with ID: ' + req.body.userID)
        } else {
            logger.debug('Successfully found user: ' + user.userName)

            let pastMentee
            let matchedMentee = false
            user.mentees.forEach((mentee, index) => {
                if(mentee._id == req.body.menteeID) {
                    pastMentee = mentee
                    user.mentees.splice(index, 1)
                    matchedMentee = true
                }
            })

            logger.error('Updated potential mentees: ' + JSON.stringify(user.mentees, null, 2))

            if (matchedMentee === false) {
                logger.error('No potential mentee was found with ID: ' + req.body.menteeID +
                    ' in ' + user.userName + ' list of current mentees.')
                res.status(600).send({
                    message: 'No potential mentee was found with ID: ' + req.body.menteeID
                })
                return
            }

            User.findByIdAndUpdate(req.body.userID, {
                    $set: {
                        mentees: user.mentees,
                    },
                    $push: {
                        pastMentees: pastMentee
                    }
                },
                function (err, user) {
                    if (err) {
                        logger.error(err)
                        res.status(400).send({
                            message: 'Unable to end relationship with mentee due to a server error. '
                        })
                    } else if (!user) {
                        logger.error('No user found with ID: ' + req.body.userID)
                        res.status(600).send({
                            message: 'Unable to end relationship with menree.  '
                        })
                    } else {
                        logger.info(user.userName + ' ended relationship with mentee: ' + req.body.menteeID)
                        res.status(200).send({
                            message: 'Relationship ended.'
                        })
                    }
                }
            )

        }
    })

}