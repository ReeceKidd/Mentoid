process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../src/app.js');
var User = require('../models/user.js');

var should = chai.should();
chai.use(chaiHttp);

describe('Users', function () {

    var newUser = new User({
        firstName: "Reece",
        lastName: "Kidd",
        userName: "Reece8899Kidd",
        email: "reecekidd12384666@gmail.com",
        age: 20,
        password: "Milkshake1",
        confirmPassword: "Milkshake1",
        country: "USA",
        terms: true,
        basicRegistrationComplete: true,
        areasOfInterestRegistrationComplete: false,
        userRegistrationComplete: false
    });
    newUser.save(function (err) {
        console.log('New user is saved.')
        done();
    });
});