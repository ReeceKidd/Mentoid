/*
The test data supplied in the following tests need to have different emails and usernames otherwise the tests fail.
*/
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

var server = require('../src/app.js');
var User = require('../models/user.js');

var should = chai.should();
chai.use(chaiHttp);

//Empty the test database before starting
User.remove({}, function(err) { 
    console.log('Empty test database before starting') 
 })

// Tests for correct registration data. 
describe('Test for valid registration', () => {
    var newUser = {
        firstName: "Sarah",
        lastName: "Robson",
        userName: "SarahRobson",
        email: "sarahrobson@gmail.com",
        age: 20,
        password: "12345678",
        confirmPassword: "12345678",
        country: "USA",
        terms: true
    }
    it('It should successfully save user', (done) => {
        chai.request(server)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

//Tests to check that a request with additional field fails
describe('Checks for additional unwanted fields in request', () => {
    it('It should have error because of additional field in user', (done) => {
        var newUser = {
            firstName: "Tom",
            lastName: "Hope",
            userName: "Tommy123",
            email: "tom-hope@gmail.com",
            age: 20,
            password: "12345678",
            confirmPassword: "12345678",
            country: "USA",
            terms: true
        }
        newUser.additionalField = 'additional information'
        chai.request(server)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(700)
                res.body.should.have.property('error').eql('Additional fields found')
                done()
            })
    })
})

//Tests to check that requests with a missing field fails.
describe('Check to see if requests missing a required field fail', () => {
    it('It should have error in response because of a lack of firstName field in request', (done) => {
        var newUser = {
            firstName: "Brad",
            lastName: "Bradely",
            userName: "BadBrad",
            email: "brad@gmail.com",
            age: 20,
            password: "password123",
            confirmPassword: "password123",
            country: "USA",
            terms: true
        }
        delete newUser.firstName
        chai.request(server)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

//Checks that request fails for all values that should be a string.
describe('Check that that require a string contain a string', () => {
    it('It should have error in response because of string values being numbers', (done) => {
        var newUser = {
            firstName: 1,
            lastName: 1,
            userName: 1,
            email: 1,
            age: 20,
            password: 1,
            confirmPassword: 1,
            country: "USA",
            terms: true
        }
        chai.request(server)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

//Checks to see that user cannot set later registration fields during basic registration.
describe('Checks that user has not tried to set later registration', () => {
    it('It should have an error because user has tried to set later registration values to true.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan@gmail.com",
            age: 20,
            password: "whitehouse",
            confirmPassword: "whitehouse",
            country: "USA",
            terms: true,
            basicRegistrationComplete: true
        }
        chai.request(server)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                res.should.have.status(700)
                res.body.should.have.property('error').eql('Additional fields found')
                done()
            })
    })
})