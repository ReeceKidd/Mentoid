var User = require('../../../models/user')

var logger = require('../../../src/logging.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

module.exports = updateUserName = (req, res) => {

    //Need to put the field checkers in. 

    var undefinedFields = checkUndefinedFields(req.body, ['userID', 'oldUserName', 'newUserName'])

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

    if (req.body.oldUserName === req.body.newUserName) {
        //User name is the same as before so nothing needs to be changed. 
        res.status(200).send({
            message: 'Username is the same does not need to be updated'
        })
    } else {
        //Checks if new username already exists in the database. 
        User.findOne({
            userName: req.body.newUserName
        }, function (err, existingUser) {
            if (existingUser) {
                res.status(900)
                res.send({
                    message: req.body.newUserName + ' is already registered',
                    error: 'Already exists in database.'
                })
            } else if (err) {
                logger.error(err)
                res.status(500)
                res.send({
                    message: 'Server error',
                    error: 'Server error'
                })
            } else {
                //If username does not exist in database it is now safe to update. 
                User.findOneAndUpdate(query, {
                        $set: {
                            userName: req.body.newUserName
                        },
                    },
                    function (err, user) {
                        if (err) {
                            logger.error(err)
                            res.status(500).send({
                                message: 'Unable to update users name. Could not find user. '
                            })
                        } else {
                            logger.info(req.body.oldUserName + ' updated username successfully: ' + user.userName)
                            res.status(200).send({
                                message: 'Updated user name.'
                            })
                        }
                    }
                )
            }
        })
    }


}