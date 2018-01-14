
var User = require('../models/User')

const adminController = {}

adminController.getUsers = (req, res) => {
    User.find({}, function(err, users){
        if(err){
            res.status(500).send('Could not get users')
        } else {
            res.status(200).send(users)
        }
    })
}

module.exports = adminController