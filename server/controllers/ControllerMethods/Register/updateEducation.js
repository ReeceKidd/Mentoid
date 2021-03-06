var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

// Formats job title to titleCase
const toTitleCase = require('../../Formatter/toTitleCase.js')

// Field checkers ensure only relevant fields are passed to request
const checkUpdateEducationFields = require('../../FieldCheckers/Registration/updateEducation')
const checkUpdateEducationArrayFields = require('../../FieldCheckers/Registration/updateEducationArray')

//Checks that requests are the correct type
const checkEducationTypes = require('../../TypeCheckers/Registration/Education')

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

//Checks all objects inside an array have the necessary fields. 
const checkUndefinedFieldsArray = require('../../UndefinedCheckers/array')

//Sanitizes different requests
const sanitizeUpdateEducation = require('../../Sanitizers/Registration/updateEducation')

//Need to check job history for duplicate values. 

// Validatiors
const updateEducationValidation = require('../../Validators/Registration/updateEducation')

module.exports = updateEducation = (req, res) => {

    logger.debug(req.headers['x-forwarded-for'] || req.connection.remoteAddress + ' attempting to update education with request ' + JSON.stringify(req.body))

    //Checks that only _id and areas of interest are passed in request. 
    var unwantedField = checkUpdateEducationFields(req.body)

    if (unwantedField) {
        logger.warn(unwantedFields)
        return res.status(700).send({
            error: 'Additional fields found',
            message: unwantedField
        })
    }

    
    //Checks that experiences array only contains title, company, experienceID, startDate, endDate and isWorkingHere. 
    var unwantedArrayField = checkUpdateEducationArrayFields(req.body.education)

    if (unwantedArrayField) {
        logger.warn(unwantedArrayField)
        return res.status(700).send({
            error: 'Additional fields found',
            message: unwantedArrayField
        })
    }
    
    var undefinedFields = checkUndefinedFields(req.body, ['_id', 'age','education'])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    
    var undefinedArrayFields = checkUndefinedFieldsArray(req.body.education, ['educationID', 'school', 'degree', 'country','fieldOfStudy','startYear','endYear'])

    if (undefinedArrayFields) {
        logger.warn(undefinedArrayFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedArrayFields
        })
    }


    //Checks that request contains an education array containing only strings and an _id which is a string.
    var checkRequestTypes = checkEducationTypes(req.body)

    if (checkRequestTypes) {
        logger.warn(checkRequestTypes)
        return res.status(850).send({
            error: 'Invalid type',
            message: checkRequestTypes
        })
    }


    //Validation for updating job history. 
    var validationError = updateEducationValidation(req)

    if (validationError) {
        logger.warn(validationError)
        return res.status(600).send({
            error: 'Validation failure',
            message: validationError
        })
    }

    sanitizeUpdateEducation(req.body)

    //Updates the title and company name to title case. 
    for (var x = 0; x < req.body.education.length; x++) {
        req.body.education[x].degree = toTitleCase(req.body.education[x].degree)
        req.body.education[x].school = toTitleCase(req.body.education[x].school)
        req.body.education[x].fieldOfStudy = toTitleCase(req.body.education[x].fieldOfStudy)
    }


    var query = {
        '_id': req.body._id
    }

    User.findOneAndUpdate(query, {
            $set: {
                education: req.body.education,
                educationRegistrationComplete: true
            },

        },
        function (err, user) {
            if (err) {
                logger.error(err)
                res.status(500).send({
                    message: 'Unable to update job history. Could not find user. '
                })
            } else {
                logger.info(user.userName + ' updated education successfully: ' + JSON.stringify(req.body.education))
                res.status(200).send({
                    message: 'Updated education successfully.'
                })
            }
        }
    )
}