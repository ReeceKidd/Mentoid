/*
These settings are from the perspective of a mentor, looking for a mentee. 
*/

var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

//Sanitizes different requests
const sanitizeUpdateMentorPreferences = require('../../Sanitizers/Registration/updateMentorPreferences')

module.exports = updateMentorSettings = (req, res) => {

    var undefinedFields = checkUndefinedFields(req.body, ['userID', 'userName', 'mentorSettings'])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    logger.debug('Entered update mentor settings. req.body:' + '\n' +
        'userID:' + req.body.userID + '\n' +
        'userName:' + req.body.userName + '\n' +
        'mentorSettings:' + JSON.stringify(req.body.mentorSettings, null, 2))

    let mentorSettings = req.body.mentorSettings

    var undefinedFieldsMentoringPreferences = checkUndefinedFields(mentorSettings, [
        'areasOfInterest',
        'prefferedMentoringFormats',
        'maximumTravelDistanceKM',
        'languages',
        'prefferedEducation',
        'maximumAge',
        'minimumAge',
        'maxNumberOfMentees'
    ])

    logger.debug('mentorSettings object: {' + '\n' +
        'areasOfInterest: ' + JSON.stringify(mentorSettings.areasOfInterest, null, 2) + '\n' +
        'prefferedMentoringFormats: ' + mentorSettings.prefferedMentoringFormats + '\n' +
        'maximumTravelDistanceKM: ' + mentorSettings.maximumTravelDistanceKM + '\n' +
        'languages: ' + mentorSettings.languages + '\n' +
        'prefferedEducation: ' + mentorSettings.prefferedEducation + '\n' +
        'maximumAge: ' + mentorSettings.maximumAge + '\n' +
        'minimumAge: ' + mentorSettings.minimumAge + '\n' +
        'maxNumberOfMentees: ' + mentorSettings.maxNumberOfMentees)

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
                mentorSettingsComplete: true,
                mentorSettings: mentorSettings
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
                    message: 'Unable to update mentor settings. Could not find user. '
                })
            } else {
                logger.info(user.userName + ' updated mentor settings successfully: ' + JSON.stringify(mentorSettings, null, 2))
                res.status(200).send({
                    message: 'Updated mentor settings.'
                })
            }
        }
    )
}