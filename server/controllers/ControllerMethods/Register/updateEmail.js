var User = require('../../../models/user')

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

module.exports = updateEmail = (req, res) => {

    //Need to put the field checkers in. 

    var undefinedFields = checkUndefinedFields(req.body, ['userID', 'oldEmail', 'newEmail'])

    if (undefinedFields) {
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    var query = {
        '_id': req.body.userID
    }

    //User name is the same as before 
    if (req.body.oldEmail === req.body.newEmail) {
        User.findOneAndUpdate(query, {
                $set: {
                    email: req.body.newEmail
                },
            },
            function (err, updated) {
                if (err) {
                    res.status(400).send({
                        message: 'Unable to update users name. Could not find user. '
                    })
                } else {
                    res.status(200).send({
                        message: 'Updated user name.'
                    })
                }
            }
        )
    } else {
        //Checks if new username already exists in the database. 
        
        User.findOne({
            email: req.body.newEmail
        }, function (err, existingUser) {
            if (existingUser) {
                res.status(900)
                res.send({
                    message: req.body.newEmail + ' is already registered',
                    error: 'Already exists in database.'
                })
            } else if (err) {
                res.status(500)
                res.send({
                    message: 'Server error',
                    error: 'Server error'
                })
            } else {
                //If username does not exist in database it is now safe to update. 
                User.findOneAndUpdate(query, {
                        $set: {
                            email: req.body.newEmail
                        },
                    },
                    function (err, updated) {
                        if (err) {
                            res.status(400).send({
                                message: 'Unable to update email. Could not find user. '
                            })
                        } else {
                            res.status(200).send({
                                message: 'Updated email.'
                            })
                        }
                    }
                )
            }
        })
    }


}