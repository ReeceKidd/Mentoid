var User = require('../../../../models/user')

var logger = require('../../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../../UndefinedCheckers/nonArray')

module.exports = endRelationshipWithMentor = (req, res) => {

    //Need to put the field checkers in. 
    logger.error('Attempting to end relationship with Mentor with request: ' + JSON.stringify(req.body, null, 2))

    var undefinedFields = checkUndefinedFields(req.body, ['userID', 'mentorID'])

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
                message: 'Unable to end relationship with Mentor. Server error. '
            })
        } else if(!user) {
            logger.error('Could not find user with ID: ' + req.body.userID)
        } else {
            logger.debug('Successfully found user: ' + user.userName)

            let pastMentor
            let matchedMentor = false
            user.mentors.forEach((mentor, index) => {
                if(mentor._id == req.body.mentorID) {
                    pastMentor = mentor
                    user.mentors.splice(index, 1)
                    matchedMentor = true
                }
            })

            logger.error('Updated potential Mentors: ' + JSON.stringify(user.mentors, null, 2))

            if (matchedMentor === false) {
                logger.error('No potential Mentor was found with ID: ' + req.body.mentorID +
                    ' in ' + user.userName + ' list of current Mentors.')
                res.status(600).send({
                    message: 'No potential Mentor was found with ID: ' + req.body.mentorID
                })
                return
            }

            User.findByIdAndUpdate(req.body.userID, {
                    $set: {
                        mentors: user.mentors,
                    },
                    $push: {
                        pastMentors: pastMentor
                    }
                },
                function (err, user) {
                    if (err) {
                        logger.error(err)
                        res.status(400).send({
                            message: 'Unable to end relationship with Mentor due to a server error. '
                        })
                    } else if (!user) {
                        logger.error('No user found with ID: ' + req.body.userID)
                        res.status(600).send({
                            message: 'Unable to end relationship with mentor because no user was found with ID: ' + req.body.userID
                        })
                    } else {
                        logger.info(user.userName + ' ended relationship with Mentor: ' + req.body.MentorID)
                        res.status(200).send({
                            message: 'Relationship ended.'
                        })
                    }
                }
            )

        }
    })

}