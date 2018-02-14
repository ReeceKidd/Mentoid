var User = require('../../../models/user')

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

//Checks all objects inside an array have the necessary fields. 
const checkUndefinedFieldsArray = require('../../UndefinedCheckers/array')

//Sanitizes different requests
const sanitizeUpdateMentorPreferences = require('../../Sanitizers/Registration/updateMentorPreferences')

module.exports = updateMentorPreferences = (req, res) => {

    console.log(req.body)

    //Need to put the field checkers in. 

    var undefinedFields = checkUndefinedFields(req.body, ['userID',
        'areasOfInterestMentoring',
        'prefferedMentoringFormats',
        'maximumTravelDistance',
        'mentoringLanguages',
        'prefferedEducationMentoring',
        'maximumAgeMentoring',
        'minimumAgeMentoring'
    ])

    if (undefinedFields) {
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }


    //Need to do validation for the mentor preferences section. 

    sanitizeUpdateMentorPreferences(req.body)

    var query = {
        '_id': req.body.userID
    }

    User.findOneAndUpdate(query, {
            $set: {
                mentorPreferencesComplete: true,
                areasOfInterestMentoring: req.body.areasOfInterestMentoring,
                prefferedMentoringFormats: req.body.prefferedMentoringFormats,
                maximumTravelDistance: req.body.maximumTravelDistance,
                mentoringLanguages: req.body.mentoringLanguages,
                prefferedEducationMentoring: req.body.prefferedEducationMentoring,
                minimumAgeMentoring: req.body.minimumAgeMentoring,
                maximumAgeMentoring: req.body.maximumAgeMentoring
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