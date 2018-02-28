var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

module.exports = applyForMentorship = (req, res) => {

    //Need to put the field checkers in. 
    logger.error('Attempting to apply for mentorship with request: ' + JSON.stringify(req.body, null, 2))

    var undefinedFields = checkUndefinedFields(req.body, ['userID', 'mentorID'])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    //Get the current users information 
    logger.error('Attempting to find user with ID: ' + JSON.stringify(req.body.userID, null, 2))
    User.findById(req.body.userID, function (err, user) {
        if (err) {
            logger.error(err)
            res.status(500)
            res.send({
                message: 'Could not get current users details',
                error: 'Server error'
            })
            return
        } else if (!user) {
            logger.error("Could not locate user with userID: " + req.body.userID)
            res.status(500)
            res.send({
                message: 'Could not locate user with userID',
                error: 'Could not locate error'
            })
            return
        } else {
            logger.error('Found user: ' + user.userName)
            logger.error('Attempting to find mentor with ID: ' + req.body.mentorID)
            //Get current mentors details. 
            User.findById(req.body.mentorID,
                function (err, mentor) {
                    if (err) {
                        logger.error(err)
                        res.status(400).send({
                            message: 'Unable to update users name. Could not find user. '
                        })
                        return
                    } else if (!mentor) {
                        logger.error('No mentor was found with that ID. ')
                        res.status(600).send('Could not locate mentor with that ID. ')
                        return
                    } else {
                        logger.error('Found mentor: ' + mentor.userName)
                        logger.error('Mentor: ' + mentor.userName + ' maximum number of mentees: ' + mentor.mentorSettings.maxNumberOfMentees)
                        logger.error('Mentor: ' + mentor.userName + ' current number of mentees: ' + mentor.mentees.length)
                        logger.error('Mentor: ' + mentor.userName + ' current mentees: ' + JSON.stringify(mentor.mentees, null, 2))
                        if (mentor.mentees.length <= mentor.mentorSettings.maxNumberOfMentees) {
                            logger.error('Mentor: ' + mentor.userName + ' number of current mentees is less than their maximum')
                        } else {
                            logger.error('Mentor: ' + mentor.userName + ' number of current mentees is greater than their maximum')
                        }
                        logger.error('Checking if user has already applied to be on the waitlist')
                        //Checks if user has already applied to be on a waitlist. 
                        logger.error('Mentor ' + mentor.userName + ' number of mentees on waiting list: ' + mentor.potentialMentees.length)
                        let isAlreadyOnList = false
                        mentor.potentialMentees.forEach(potentialMentee => {
                            if (potentialMentee._id == req.body.userID) {
                                logger.error('User: ' + user.userName + ' is already on mentors: ' + mentor.userName + ' waiting list.')
                                isAlreadyOnList = true
                            }
                        })

                        if (isAlreadyOnList) {
                            res.status(600).send({
                                message: 'You have already applied to be on ' + mentor.userName + "'s potential mentees list."
                            })
                            return
                        }

                        logger.error('User ' + user.userName + ' is not on mentors' + mentor.userName + ' exiting potential mentees list adding to wait list.')

                        //Pushes user onto potential mentors wait list. 
                        User.findByIdAndUpdate(req.body.mentorID, {
                                $push: {
                                    potentialMentees: user
                                },
                            },
                            function (err, updatedMentor) {
                                if (err) {
                                    logger.error(err)
                                    res.status(500).send({
                                        message: 'Unable to push ' + user.userName + ' onto ' + mentor.userName + ' potentialMentees list. Because of server error'
                                    })
                                    return
                                } else if (!updatedMentor) {
                                    logger.error(err)
                                    res.status(600).send({
                                        message: 'Could not find user with ID: ' + req.body.userID
                                    })
                                    return
                                } else {
                                    logger.error(user.userName + ' pushed to ' + updatedMentor.userName + ' potential mentees list.')
                                    // Pushes mentor onto users potential mentors list
                                    logger.error('Mentor ' + updatedMentor.userName + ' is awaiting response ' + updatedMentor.awaitingResponse)
                                    User.findByIdAndUpdate(req.body.userID, {
                                            $push: {
                                                potentialMentors: updatedMentor
                                            }
                                        },
                                        function (err, updatedUser) {
                                            if (err) {
                                                logger.error(err)
                                                res.status(500).send({
                                                    message: 'Unable to push ' + updatedMentor.userName + ' onto ' + user.userName + ' potentialMentor list. Because of server error'
                                                })
                                                return
                                            } else if (!updatedUser) {
                                                logger.error(err)
                                                res.status(600).send({
                                                    message: 'Could not find mentor with ID: ' + req.body.mentorID
                                                })
                                                return
                                            } else {
                                                logger.error(updatedMentor.userName + ' pushed to ' + updatedUser.userName + ' potential mentors list.')
                                            }
                                        })
                                    //Success Message
                                    res.status(200).send('You where successfully added to ' + updatedMentor.userName + "'s potential mentees list.")
                                }
                            })
                    }
                })
        }
    })
}