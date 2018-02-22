/*
These settings are from the perspective of a mentee, looking for a mentee. 
*/

var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

//Sanitizes different requests
const sanitizeUpdateMentorPreferences = require('../../Sanitizers/Registration/updateMentorPreferences')

module.exports = updateMenteeSettings = (req, res) => {

    var undefinedFields = checkUndefinedFields(req.body, ['userID', 'userName', 'menteeSettings'])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    logger.debug('Entered update mentee settings. req.body:' + '\n' +
        'userID:' + req.body.userID + '\n' +
        'userName:' + req.body.userName + '\n' +
        'menteeSettings:' + JSON.stringify(req.body.menteeSettings, null, 2))

    let menteeSettings = req.body.menteeSettings

    var undefinedFieldsMentoringPreferences = checkUndefinedFields(menteeSettings, [
        'wouldLikeAMentor',
        'areasOfInterest',
        'prefferedMentoringFormats',
        'maximumTravelDistanceKM',
        'languages',
        'prefferedEducation',
        'maximumAge',
        'minimumAge',
        'maxNumberOfMentors'
    ])

    logger.debug('menteeSettings object: {' + '\n' +
        'wouldLikeAMentor: ' + menteeSettings.wouldLikeAMentor + '\n' +
        'areasOfInterest: ' + JSON.stringify(menteeSettings.areasOfInterest, null, 2) + '\n' +
        'prefferedMentoringFormats: ' + menteeSettings.prefferedMentoringFormats + '\n' +
        'maximumTravelDistanceKM: ' + menteeSettings.maximumTravelDistanceKM + '\n' +
        'languages: ' + menteeSettings.languages + '\n' +
        'prefferedEducation: ' + menteeSettings.prefferedEducation + '\n' +
        'maximumAge: ' + menteeSettings.maximumAge + '\n' +
        'minimumAge: ' + menteeSettings.minimumAge + '\n' +
        'maxNumberOfMentors: ' + menteeSettings.maxNumberOfMentors)

    if (undefinedFieldsMentoringPreferences) {
        logger.warn(undefinedFieldsMentoringPreferences)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    //Need to do validation for the mentee preferences section. 

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
                menteeSettingsComplete: true,
                menteeSettings: menteeSettings
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
                    message: 'Unable to update mentee settings. Could not find user. '
                })
            } else {
                logger.info(user.userName + ' updated mentee settings successfully: ' + JSON.stringify(menteeSettings, null, 2))
                res.status(200).send({
                    message: 'Updated mentee settings.'
                })
            }
        }
    )
}