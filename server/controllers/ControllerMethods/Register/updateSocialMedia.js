var User = require('../../../models/user')

//Checks that required fields are defined.
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

// Field checkers ensure only relevant fields are passed to request
const checkSocialMediaFields = require('../../FieldCheckers/Registration/socialMedia')

//Checks that requests are the correct type
const basicTypeCheck = require('../../TypeCheckers/Registration/basicTypeCheck')

//Check for null values
const checkForNull = require('../../NullChecker/checkForNull')

//Sanitizes different requests
const sanitizeSocialMedia = require('../../Sanitizers/Registration/socialMedia')

// Validatiors
const socialMediaValidation = require('../../Validators/Registration/socialMedia')


module.exports = updateSocialMedia = (req, res) => {

    console.log(req.body)

    /*
    Update social media does not require a check for undefined fields as all the information is optional.
    */

    //Checks that fields only defined in the schema are passed. 
    var unwantedFields = checkSocialMediaFields(req)

    if (unwantedFields) {
        res.status(700).json({
            message: unwantedFields,
            error: 'Additional fields found'
        })
        return
    }

    var nullPresent = checkForNull(req.body)

    if (nullPresent) {
        res.status(975).json({
            message: nullPresent,
            error: 'Null value present'
        })
        return
    }

    //Checks that each of the fields are type string. 
    var badType = basicTypeCheck(req.body)

    if (badType) {
        console.log(badType)
        res.status(850).json({
            message: badType,
            error: 'Invalid type'
        })
        return
    }

    //Validation for basic registration. 
    var errors = socialMediaValidation(req)
    if (errors) {
        console.log(errors)
        res.status(600).json({
            message: errors,
            error: 'Validation failure'
        })
        return
    }
    //Santize input before being passed to database
    sanitizeSocialMedia(req.body)

    var query = {
        '_id': req.body._id
    }

    User.findOneAndUpdate(query, {
            $set: {
                facebook: req.body.facebook,
                instagram: req.body.instagram,
                twitter: req.body.twitter,
                snapchat: req.body.snapchat,
                linkedIn: req.body.linkedIn,
                medium: req.body.medium,
                youtube: req.body.youtube,
                website: req.body.website,
                socialMediaComplete: true
            },

        },
        function (err, updated) {
            if (err) {
                res.status(400).send({
                    message: 'Unable to update social media. Could not find user. '
                })
            } else {
                res.status(200).send({
                    message: 'Updated social media successfully.'
                })
            }
        }
    )

}