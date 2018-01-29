var User = require('../../../models/user')

// Formats job title to titleCase
const toTitleCase = require('../../Formatter/toTitleCase.js')

// Field checkers ensure only relevant fields are passed to request
const checkUpdateJobHistoryFields = require('../../FieldCheckers/Registration/updateJobHistory')
const checkUpdateJobHistoryArrayFields = require('../../FieldCheckers/Registration/updateJobHistoryArray')

//Checks that requests are the correct type
const checkJobHistoryTypes = require('../../TypeCheckers/Registration/jobHistory')

//Sanitizes different requests
const sanitizeUpdateJobHistory = require('../../Sanitizers/Registration/updateJobHistory')

//Need to check job history for duplicate values. 

// Validatiors
const updateJobHistoryValidation = require('../../Validators/Registration/updateJobHistory')

module.exports = updateJobHistory = (req, res) => {
    //Checks that only _id and areas of interest are passed in request. 
    var unwantedField = checkFields.updateJobHistory(req.body)

    if (unwantedField) {
        return res.status(700).send({
            error: 'Additional fields found',
            message: unwantedField
        })
    }

    //Checks that experiences array only contains title, company, experienceID, startDate, endDate and isWorkingHere. 
    var unwantedArrayField = checkFields.updateJobHistoryExperiencesArray(req.body.experiences)

    if (unwantedArrayField) {
        return res.status(700).send({
            error: 'Additional fields found',
            message: unwantedArrayField
        })
    }

    //Checks that request contains an experiences array containing only strings and an _id which is a string.
    var checkRequestTypes = typeChecker.checkJobHistory(req.body)

    if(checkRequestTypes){
        console.log(checkRequestTypes)
        return res.status(850).send({
            error: 'Invalid type',
            message: checkRequestTypes
        })
    }

    //Updates the title and company name to title case. 
    for (var x = 0; x < req.body.experiences.length; x++) {
        req.body.experiences[x].title = toTitleCase(req.body.experiences[x].title)
        req.body.experiences[x].company = toTitleCase(req.body.experiences[x].company)
    }


    //Validation for updating job history. 
    var errors = updateJobHistoryValidation(req)

    if (errors) {
        console.log(errors)
        return res.status(600).send({
            error: 'Validation failure',
            message: errors[Object.keys(errors)[0]].msg
        })
    }
    else {
        
        var query = {
            '_id': req.body._id
        }

        User.findOneAndUpdate(query, {
                $set: {
                    jobHistoryRegistrationComplete: true
                },

            },
            function (err, updated) {
                if (err) {
                    res.status(400).send({
                        message: 'Unable to update job history. Could not find user. '
                    })
                } else {
                    res.status(200).send({
                        message: 'Updated job history successfully.'
                    })
                }
            }
        )
    }
}