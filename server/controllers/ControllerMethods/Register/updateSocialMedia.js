var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

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

    /*
    Update social media does not require a check for undefined fields as all the information is optional.
    */

    logger.debug('Entered update social media. req.body:' + '\n' +
        'userID:' + req.body.userID + '\n' +
        'userName:' + req.body.userName + '\n' +
        'facebook: ' + req.body.facebook + '\n' +
        'instagram: ' + req.body.instagram + '\n' +
        'twitter: ' + req.body.twitter + '\n' +
        'linkedIn: ' + req.body.linkedIn + '\n' +
        'snapchat: ' + req.body.snapchat + '\n' +
        'medium: ' + req.body.medium + '\n' +
        'youtube: ' + req.body.youtube + '\n' +
        'website: ' + req.body.website)

    //Need to add a field checker for this method. 

    //Validation for basic registration. 
    var errors = socialMediaValidation(req)
    if (errors) {
        logger.warn(errors)
        res.status(600).json({
            message: errors,
            error: 'Validation failure'
        })
        return
    }

    var query = {
        '_id': req.body.userID
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
        function (err, user) {
            if (err) {
                logger.error(err)
                res.status(400).send({
                    message: 'Unable to update social media. Could not find user. '
                })
            } else if (!user) {
                logger.warn('No user found with _id: ' + req.body.userID)
                res.status(600).send({
                    message: 'Unable to update social media. Could not find user. '
                })
            } else {
                logger.info(user.userName + ' updated social media successfully: ' + JSON.stringify(req.body))
                res.status(200).send({
                    message: 'Updated social media successfully.'
                })
            }
        }
    )

}