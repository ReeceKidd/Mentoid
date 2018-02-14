var User = require('../../../models/user')


module.exports = updateAreasOfInterest = (req, res) => {

    var query = {
        '_id': req.body._id
    }

    User.findOneAndUpdate(query, {
            $set: {
                areasOfInterest: req.body.areasOfInterest,
                areasOfInterestRegistrationComplete: true
            },

        },
        function (err, updated) {
            if (err) {
                res.status(400).send({
                    message: 'Unable to update areas of interest. Could not find user. '
                })
            } else {
                res.status(200).send({
                    message: 'Updated areas of interest successfully.'
                })
            }
        }
    )
}