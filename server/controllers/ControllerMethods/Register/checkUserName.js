// Need to add appropriate field checkers and sanitization for username. 
var User = require('../../../models/user')

module.exports = checkUserName = (req, res) => {
    const username = req.params.username
    User.findOne({
        userName: username
    }, function (err, existingUser) {
        if (existingUser) {
            res.status(900)
            res.send({
                message: 'Username already exists',
                error: 'Already exists in database.'
            })
        } else if (err) {
            res.status(500)
            res.send({
                message: '',
                error: 'Server error'
            })
        } else {
            res.status(200)
            res.send({
                message: 'Email available'
            })
        }
    })
}