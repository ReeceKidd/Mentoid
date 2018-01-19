
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

/*
The getAnyUserID route is needed for testing purposes. 
*/
adminController.getAnyUserID = (req, res) => {
    var query = User.findOne({}).select('_id')
    query.exec(function (err, userID){
        if(err) return err
        else {
            res.send(userID)
        }
    })
}

module.exports = adminController