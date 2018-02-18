var User = require('../../../models/user')

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
                res.status(400).send({
                    message: 'Unable to update job history. Could not find user. '
                })
            } else {
                res.status(200).send({
                    message: 'Updated job history successfully.'
                })
            }
        }
    )
}
