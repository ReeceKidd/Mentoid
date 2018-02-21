var User = require('../../../models/user')

var logger = require('../../../src/logging.js')(module)

module.exports = updateLocationInformation = (req, res) => {

    var query = {
        '_id': req.body.userID
    }

    User.findOneAndUpdate(query, {
            $set: {
                location: req.body.location
            },

        },
        function (err, updated) {
            if (err) {
                logger.error(err)
                res.status(500).send({
                    message: 'Unable to update location information. Could not find user. '
                })
            } else {
                logger.info(user.userName + ' updated location information successfully: ' + req.body.location)
                res.status(200).send({
                    message: 'Updated location information successfully.'
                })
            }
        }
    )
}
