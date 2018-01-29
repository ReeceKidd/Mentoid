//Need to add appropriate field checkers, sanitize etc for emails. 
var User = require('../../../models/user')

module.exports = checkEmail = (req, res) =>{
    const email = req.params.email
    User.findOne({
        email: email
    }, function (err, existingEmail) {
        if (existingEmail) {
            res.status(900)
            res.send({
                message: 'Email already exists',
                error: 'Already exists in database.'
            })
        } else if (err) {
            res.status(500)
            res.send({
                message: 'Email available',
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