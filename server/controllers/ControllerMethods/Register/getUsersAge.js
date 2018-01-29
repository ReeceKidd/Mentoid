var User = require('../../../models/user')

module.exports = getUsersAge = (req, res) =>{
    const userID = req.params.userID
    var query = {
        _id: userID
    }
    User.findOne(query, function (err, user) {
        if (err) {
            res.status(500)
            res.send({
                message: 'Could not get users age',
                error: 'Server error'
            })
        }
    }).select('age -_id').then(user => {
        res.status(200).send({
            age: user.age
        })
    })
}