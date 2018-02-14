var User = require('../models/User')

const testController = {}

// Returns a list of all users
testController.getSingleUserID = (req, res) => {
    User.findOne({}, {}, {
        sort: {
            'created_at': 1
        }
    }, function (err, userID) {
        if (err) return next(err);
        res.status(200)
        res.send(userID)
    });
};

testController.getUserIDFromUserName = (req, res) => {
    
    const userName = req.params.userName

    var query = {
        'userName': userName
    }
    User.findOne(query, function (err, user) {
        if (err) {
            res.status(500)
            res.send({
                message: 'Could not get userID',
                error: 'Server error'
            })
        }
    }).select('_id').then(user => {
        res.status(200).send({
            userID: user._id
        })
    })
};

module.exports = testController;
