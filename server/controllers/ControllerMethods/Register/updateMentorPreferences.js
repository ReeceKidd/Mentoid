var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

//Sanitizes different requests
const sanitizeUpdateMentorPreferences = require('../../Sanitizers/Registration/updateMentorPreferences')

module.exports = updateMentorPreferences = (req, res) => {

    //Need to put the field checkers in. 

    var undefinedFields = checkUndefinedFields(req.body, ['userID', 'mentorPreferences'])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    var undefinedFieldsMentoringPreferences = checkUndefinedFields(req.body.mentorPreferences, [
        'areasOfInterest',
        'prefferedMentoringFormats',
        'maximumTravelDistanceKM',
        'languages',
        'prefferedEducation',
        'maximumAge',
        'minimumAge',
        'maxNumberOfMentees'
    ])

    if (undefinedFieldsMentoringPreferences) {
        logger.warn(undefinedFieldsMentoringPreferences)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }



    //Need to do validation for the mentor preferences section. 

    sanitizeUpdateMentorPreferences(req.body)

    var mentorPreferences = req.body.mentorPreferences   


    var query = {
        '_id': req.body.userID
    }

    User.findOneAndUpdate(query, {
            $set: {
                mentorPreferencesComplete: true,
                mentorPreferences: req.body.mentorPreferences
            },

        },
        function (err, user) {
            if (err) {
                logger.error(err)
                res.status(400).send({
                    message: 'Unable to update mentor preferences. Could not find user. '
                })
            } else {
                logger.info(user.userName + ' updated mentor preferences successfully: ' + req.body.mentorPreferences)
                res.status(200).send({
                    message: 'Updated mentor preferences.'
                })
            }
        }
    )
}