var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

module.exports = updateLocationInformation = (req, res) => {

    var query = {
        '_id': req.body.userID
    }

    User.findOneAndUpdate(query, {
            $set: {
                location: req.body.location
            },

        },
        function (err, user) {
            if (err) {
                logger.error(err)
                res.status(500).send({
                    message: 'Server error'
                })
            } else if (!user) {
                logger.warn('No user found with _id: ' + req.body.userID)
                res.status(600).send({
                    message: 'Unable to update location. Could not find user. '
                })
            } else {
                logger.info(user.userName + ' updated location informtion successfully: ' + JSON.stringify(user.location, null, 2))
                res.status(200).send({
                    message: 'Updated location.'
                })
            }
        }
    )
}
