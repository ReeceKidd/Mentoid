var User = require('../../../models/user')

var logger = require('../../../src/logging.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

module.exports = updateName = (req, res) => {

    //Need to put the field checkers in. 

    var undefinedFields = checkUndefinedFields(req.body, ['userID'])

    if (undefinedFields) {
        logger.error(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    var query = {
        '_id': req.body.userID
    }

    User.findOneAndUpdate(query, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            },
        },
        function (err, user) {
            if (err) {
                logger.error(err)
                res.status(400).send({
                    message: 'Unable to update users name. Could not find user. '
                })
            } else {
                logger.info(user.userName + ' updated first and last name successfully: ' + req.body.firstName + ' ' + req.body.lastName)
                res.status(200).send({
                    message: 'Updated user name.'
                })
            }
        }
    )
}