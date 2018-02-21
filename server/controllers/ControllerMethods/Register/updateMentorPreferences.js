var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

//Sanitizes different requests
const sanitizeUpdateMentorPreferences = require('../../Sanitizers/Registration/updateMentorPreferences')

module.exports = updateMentorPreferences = (req, res) => {

    var undefinedFields = checkUndefinedFields(req.body, ['userID', 'userName', 'mentorPreferences'])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    logger.debug('Entered update mentor preferences. req.body:' + '\n' +
        'userID:' + req.body.userID + '\n' +
        'userName:' + req.body.userName + '\n' +
        'mentorPreferences:' + JSON.stringify(req.body.mentorPreferences, null, 2))

    let mentorPreferences = req.body.mentorPreferences

    var undefinedFieldsMentoringPreferences = checkUndefinedFields(mentorPreferences, [
        'areasOfInterest',
        'prefferedMentoringFormats',
        'maximumTravelDistanceKM',
        'languages',
        'prefferedEducation',
        'maximumAge',
        'minimumAge',
        'maxNumberOfMentees'
    ])

    logger.debug('mentorPreferences object: {' + '\n' +
        'areasOfInterest: ' + JSON.stringify(mentorPreferences.areasOfInterest, null, 2) + '\n' +
        'prefferedMentoringFormats: ' + mentorPreferences.prefferedMentoringFormats + '\n' +
        'maximumTravelDistanceKM: ' + mentorPreferences.maximumTravelDistanceKM + '\n' +
        'languages: ' + mentorPreferences.languages + '\n' +
        'prefferedEducation: ' + mentorPreferences.prefferedEducation + '\n' +
        'maximumAge: ' + mentorPreferences.maximumAge + '\n' +
        'minimumAge: ' + mentorPreferences.minimumAge + '\n' +
        'maxNumberOfMentees: ' + mentorPreferences.maxNumberOfMentees)

    if (undefinedFieldsMentoringPreferences) {
        logger.warn(undefinedFieldsMentoringPreferences)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    //Need to do validation for the mentor preferences section. 

    try {
        sanitizeUpdateMentorPreferences(req.body)
    } catch (error) {
        logger.warn('Sanitatization error')
    }

    var query = {
        '_id': req.body.userID
    }

    User.findOneAndUpdate(query, {
            $set: {
                mentorPreferencesComplete: true,
                mentorPreferences: mentorPreferences
            },

        },
        function (err, user) {
            if (err) {
                logger.error(err)
                res.status(500).send({
                    message: 'Server error'
                })
            } else if (!user) {
                logger.warn('No user found with _id: ' + req.body.userID)
                res.status(600).send({
                    message: 'Unable to update mentor preferences. Could not find user. '
                })
            } else {
                logger.info(user.userName + ' updated mentor preferences successfully: ' + JSON.stringify(mentorPreferences, null, 2))
                res.status(200).send({
                    message: 'Updated mentor preferences.'
                })
            }
        }
    )
}