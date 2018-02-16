var User = require('../../../models/user')

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

//Sanitizes different requests
const sanitizeUpdateMentorPreferences = require('../../Sanitizers/Registration/updateMentorPreferences')

module.exports = updateMentorPreferences = (req, res) => {

    //Need to put the field checkers in. 

    var undefinedFields = checkUndefinedFields(req.body, ['userID', 'menteePreferences'])

    if (undefinedFields) {
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    var undefinedFieldsMentoringPreferences = checkUndefinedFields(req.body.menteePreferences, [
    'mentoringAreasOfInterest',
    'prefferedMentoringFormats',
    'maximumTravelDistanceKM',
    'mentoringLanguages',
    'prefferedEducation',
    'maximumAge',
    'minimumAge'])

    if (undefinedFieldsMentoringPreferences) {
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    //Need to do validation for the mentor preferences section. 
    //Also need to do the field check. 

    sanitizeUpdateMentorPreferences(req.body)

    var query = {
        '_id': req.body.userID
    }

    User.findOneAndUpdate(query, {
            $set: {
                menteePreferencesComplete: true,
                menteePreferences: req.body.menteePreferences
            },
        },
        function (err, updated) {
            if (err) {
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