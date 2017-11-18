var express = require('express');
var router = express.Router();

router.post('/', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    console.log(name);
    //Validation 
    req.checkBody('name', 'Name is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        console.log('YES there are errors');
    }
    else {
        console.log('No there are not errors');
    }
});

router.get('/', function(req, res){
    res.render('login');
});

module.exports = router;