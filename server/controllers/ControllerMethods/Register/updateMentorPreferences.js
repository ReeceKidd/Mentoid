var User = require('../../../models/user')

var logger = require('../../../src/logging.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

//Sanitizes different requests
const sanitizeUpdateMentorPreferences = require('../../Sanitizers/Registration/updateMentorPreferences')

module.exports = updateMentorPreferences = (req, res) => {

    //Need to put the field checkers in. 

    var undefinedFields = checkUndefinedFields(req.body, ['userID', 'mentorPreferences'])

    if (undefinedFields) {
        logger.error(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    var undefinedFieldsMentoringPreferences = checkUndefinedFields(req.body.mentorPreferences, [
        'mentoringAreasOfInterest',
        'prefferedMentoringFormats',
        'maximumTravelDistanceKM',
        'mentoringLanguages',
        'prefferedEducation',
        'maximumAge',
        'minimumAge',
        'maxNumberOfMentees'
    ])

    if (undefinedFieldsMentoringPreferences) {
        logger.error(undefinedFieldsMentoringPreferences)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }



    //Need to do validation for the mentor preferences section. 

    sanitizeUpdateMentorPreferences(req.body)

    var mentorPreferences = req.body.mentorPreferences
    console.log(mentorPreferences.mentoringAreasOfInterest)
    

    var query = {
        '_id': req.body.userID
    }

    User.findOneAndUpdate(query, {
            $set: {
                mentorPreferencesComplete: true,
                mentoringAreasOfInterest: mentorPreferences.mentoringAreasOfInterest,
                prefferedMentoringFormats: mentorPreferences.prefferedMentoringFormats,
                maximumTravelDistanceKM: mentorPreferences.maximumTravelDistanceKM,
                mentoringLanguages: mentorPreferences.mentoringLanguages,
                prefferedEducation: mentorPreferences.prefferedEducation,
                minimumAge: mentorPreferences.minimumAge,
                maximumAge: mentorPreferences.maximumTravelDistanceKM,
                maxNumberOfMentees: mentorPreferences.maxNumberOfMentees
            },

        },
        function (err, updated) {
            if (err) {
                logger.error(err)
                res.status(400).send({
                    message: 'Unable to update mentor preferences. Could not find user. '
                })
            } else {
                res.status(200).send({
                    message: 'Updated mentor preferences.'
                })
            }
        }
    )
}