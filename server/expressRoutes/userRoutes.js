var express = require('express');
var app = express();
var userRoutes = express.Router();

// Require Item model in our routes module
var User = require('../models/User');

// Defined store route
userRoutes.route('/add').post(function (req, res) {
  var user = new User(req.body);
      user.save()
    .then(user => {
    res.status(200).json({'user': 'User added successfully'});
    })
    .catch(err => {
    res.status(400).send("Unable to save user to database");
    });
});

userRoutes.route('/isUsernameAvailable').get(function (req, res) {
  var user = req.body
  User.findOne({username: user}, function(err, existingUser){
    if(existingUser == null){
      return true
    }
    return false
  })
})

// Defined get data(index or listing) route
userRoutes.route('/').get(function (req, res) {
  User.find(function (err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

module.exports = userRoutes;