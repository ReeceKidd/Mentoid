var User = require('../../../models/user')

module.exports = getAreasOfInterest = (req, res) => {
    const userID = req.params.userID
    User.findById(userID, function (err, user) {
        if (err) {
            res.status(500)
            res.send({
                message: 'Could not get areas of interest',
                error: 'Server error'
            })
        }
    }).select('areasOfInterest -_id').then(user => {
        /*
        Once a user submits areas of interest, additional fields are added that will be used
        for matching, however a user should not be able to see or change these, the
        code below makes sure they cant see the other fields. 
        */
        var areasOfInterestWithFieldsUserCanUpdate = []
        for (var x = 0; x < user.areasOfInterest.length; x++) {
            areasOfInterestWithFieldsUserCanUpdate.push({
                value: user.areasOfInterest[x].value,
                years: user.areasOfInterest[x].years,
                areaOfInterestID: user.areasOfInterest[x].areaOfInterestID
            })
        }
        res.status(200).send({
            areasOfInterest: areasOfInterestWithFieldsUserCanUpdate
        })
    })
}