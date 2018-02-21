var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

//Checks all objects inside an array have the necessary fields. 
const checkUndefinedFieldsArray = require('../../UndefinedCheckers/array')

// Formats value of area of interest to title case. 
const toTitleCase = require('../../Formatter/toTitleCase.js')

// Field checkers ensure only relevant fields are passed to request
const checkUpdateAreasOfInterestFields = require('../../FieldCheckers/Registration/updateAreasOfInterest')
const checkUpdateAreasOfInterestArrayFields = require('../../FieldCheckers/Registration/updateAreasOfInterestArray')

//Checks that requests are the correct type
const checkAreasOfInterestTypes = require('../../TypeCheckers/Registration/areasOfInterest')

//Sanitizes different requests
const sanitizeUpdateAreasOfInterest = require('../../Sanitizers/Registration/updateAreasOfInterest')

//Checks for duplication of values in array.
const checkAreasOfInterestDuplicates = require('../../DuplicationChecker/Registration/checkAreasOfInterestDuplicates')

// Validatiors
const updateAreasOfInterestValidation = require('../../Validators/Registration/updateAreasOfInterest')

module.exports = updateAreasOfInterest = (req, res) => {

    var undefinedFields = checkUndefinedFields(req.body, ['_id', 'age','areasOfInterest'])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    var undefinedArrayFields = checkUndefinedFieldsArray(req.body.areasOfInterest, ['value', 'years','areaOfInterestID'])

    if (undefinedArrayFields) {
        logger.warn(undefinedArrayFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedArrayFields
        })
    }

    //Checks that only _id and areas of interest are passed in request. 
    var unwantedField = checkUpdateAreasOfInterestFields(req.body)

    if (unwantedField) {
        logger.warn(unwantedField)
        return res.status(700).send({
            error: 'Additional fields found',
            message: unwantedField
        })
    }

    //Checks that the areasOfInterest array only contains value, years, and areaOfInterestID. 
    var unwantedArrayField = checkUpdateAreasOfInterestArrayFields(req.body.areasOfInterest)

    if (unwantedArrayField) {
        logger.warn(unwantedArrayField)
        return res.status(700).send({
            error: 'Additional fields found',
            message: unwantedArrayField
        })
    }

    //Checks that request contains an areasOfInterest arrayy containing strings and a string array.
    var checkRequestTypes = checkAreasOfInterestTypes(req.body)

    if (checkRequestTypes) {
        logger.warn(checkRequestTypes)
        return res.status(850).send({
            error: 'Invalid type',
            message: checkRequestTypes
        })
    }


    for (var x = 0; x < req.body.areasOfInterest.length; x++) {
        req.body.areasOfInterest[x].value = toTitleCase(req.body.areasOfInterest[x].value)
    }

    //Checks that there are no duplicate values for the areas of interest
    var duplicatedAreaOfInterestValues = checkAreasOfInterestDuplicates(req.body.areasOfInterest)

    if (duplicatedAreaOfInterestValues) {
        logger.warn(duplicatedAreaOfInterestValues)
        return res.status(800).send({
            error: 'Duplicate values',
            message: duplicatedAreaOfInterestValues
        })
    }

    //Validation for updating areas of interest. 
    var errors = updateAreasOfInterestValidation(req)

    if (errors) {
        logger.warn(errors)
        return res.status(600).send({
            error: 'Validation failure',
            message: errors[Object.keys(errors)[0]].msg
        })
    }

    sanitizeUpdateAreasOfInterest(req.body)

    var updatedAreasOfInterest = req.body.areasOfInterest
    // This updates each of the areas of interest to include fields that will be used in recommendation engine. 
    for (var x = 0; x < updatedAreasOfInterest.length; x++) {
        updatedAreasOfInterest[x].numberOfLikes = 0
        updatedAreasOfInterest[x].numberOfLinksClicked = 0
        updatedAreasOfInterest[x].articlesRead = 0
        updatedAreasOfInterest[x].videosWatched = 0
        updatedAreasOfInterest[x].pathsStudied = 0
    }

    var query = {
        '_id': req.body._id
    }

    User.findOneAndUpdate(query, {
            $set: {
                areasOfInterest: updatedAreasOfInterest,
                areasOfInterestRegistrationComplete: true
            },

        },
        function (err, user) {
            if (err) {
                logger.error(err)
                res.status(500).send({
                    message: 'Unable to update areas of interest. Could not find user. '
                })
            } else {
                logger.info(user.userName + ' updated areasOfInterest successfully: ' + areasOfInterest)
                res.status(200).send({
                    message: 'Updated areas of interest successfully.'
                })
            }
        }
    )
}