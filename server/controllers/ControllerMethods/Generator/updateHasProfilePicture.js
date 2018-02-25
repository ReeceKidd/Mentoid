/*
This method is used to updathe the hasProfilePicture user value 
when using the generator tool:
*/

var User = require('../../../models/user')


module.exports = updateHasProfilePicture = (req, res) => {

    var query = {
        '_id': req.body.userID
    }

    User.findOneAndUpdate(query, {
            $set: {
                hasProfilePicture: true,
            },

        },
        function (err, user) {
            if (!user) {
                res.status(600).send({
                    message: 'Unable to update profile picture. Could not find user. '
                })
            } else if (err) {
                console.log(err)
                res.status(500)
            } else {
                res.status(200).send({
                    message: 'Updated profile picture successfully.'
                })
            }
        }
    )
}