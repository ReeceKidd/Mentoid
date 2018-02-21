var User = require('../../../models/user')

var logger = require('../../../src/logging.js')(module)

// Formats job title to titleCase
const toTitleCase = require('../../Formatter/toTitleCase.js')

// Field checkers ensure only relevant fields are passed to request
const checkUpdateJobHistoryFields = require('../../FieldCheckers/Registration/updateJobHistory')
const checkUpdateJobHistoryArrayFields = require('../../FieldCheckers/Registration/updateJobHistoryArray')

//Checks that requests are the correct type
const checkJobHistoryTypes = require('../../TypeCheckers/Registration/jobHistory')

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

//Checks all objects inside an array have the necessary fields. 
const checkUndefinedFieldsArray = require('../../UndefinedCheckers/array')

//Sanitizes different requests
const sanitizeUpdateJobHistory = require('../../Sanitizers/Registration/updateJobHistory')

//Need to check job history for duplicate values. 

// Validatiors
const updateJobHistoryValidation = require('../../Validators/Registration/updateJobHistory')

module.exports = updateJobHistory = (req, res) => {

    //Checks that only _id and areas of interest are passed in request. 
    var unwantedField = checkUpdateJobHistoryFields(req.body)

    if (unwantedField) {
        logger.error(unwantedField)
        return res.status(700).send({
            error: 'Additional fields found',
            message: unwantedField
        })
    }

    //Checks that experiences array only contains title, company, experienceID, startDate, endDate and isWorkingHere. 
    var unwantedArrayField = checkUpdateJobHistoryArrayFields(req.body.experiences)

    if (unwantedArrayField) {
        logger.error(unwantedArrayField)
        return res.status(700).send({
            error: 'Additional fields found',
            message: unwantedArrayField
        })
    }
    
    var undefinedFields = checkUndefinedFields(req.body, ['_id', 'age','experiences'])

    if (undefinedFields) {
        logger.error(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    var undefinedArrayFields = checkUndefinedFieldsArray(req.body.experiences, ['experienceID', 'title', 'company','startYear','endYear','isWorkingHere'])

    if (undefinedArrayFields) {
        logger.error(undefinedArrayFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedArrayFields
        })
    }


    //Checks that request contains an experiences array containing only strings and an _id which is a string.
    var checkRequestTypes = checkJobHistoryTypes(req.body)

    if (checkRequestTypes) {
        logger.error(checkRequestTypes)
        return res.status(850).send({
            error: 'Invalid type',
            message: checkRequestTypes
        })
    }


    //Validation for updating job history. 
    var validationError = updateJobHistoryValidation(req)

    if (validationError) {
        logger.error(validationError)
        return res.status(600).send({
            error: 'Validation failure',
            message: validationError
        })
    }

    sanitizeUpdateJobHistory(req.body)

    //Updates the title and company name to title case. 
    for (var x = 0; x < req.body.experiences.length; x++) {
        req.body.experiences[x].title = toTitleCase(req.body.experiences[x].title)
        req.body.experiences[x].company = toTitleCase(req.body.experiences[x].company)
    }


    var query = {
        '_id': req.body._id
    }

    User.findOneAndUpdate(query, {
            $set: {
                jobHistory: req.body.experiences,
                jobHistoryRegistrationComplete: true
            },

        },
        function (err, user) {
            if (err) {
                logger.error(err)
                res.status(400).send({
                    message: 'Unable to update job history. Could not find user. '
                })
            } else {
                logger.info(user.userName + ' updated job history successfully: ' + req.body.experiences)
                res.status(200).send({
                    message: 'Updated job history successfully.'
                })
            }
        }
    )
}