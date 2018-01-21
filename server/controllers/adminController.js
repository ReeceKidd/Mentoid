
var User = require('../models/User')

const adminController = {}

// Returns a list of all users
adminController.getUsers = (req, res) => {
    User.find({}, function(err, users){
        if(err){
            res.status(500).send('Could not get users')
        } else {
            res.status(200).send(users)
        }
    })
}

//Return the age of a particular user based on their ID. 
adminController.getUsersAge = (req, res) => {
    const userID = req.params.userID
    User.findById(userID, function (err, user) {
        if (err) {
            console.log(err)
        }
    }).select('age -_id').then(user => {

        res.status(200).send({
            age: user.age
        })
    })
}

module.exports = adminController