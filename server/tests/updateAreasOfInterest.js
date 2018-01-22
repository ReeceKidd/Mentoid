/*

These tests are used to check the registration controllers register method. 

Tests in this section.
1) Tests for correct registration data. 
2) Tests to check that a request with additional field fails
3) Tests to check that requests with a missing field fails.
4) Checks that request fails for all values that should be a string.
5) Checks to see that user cannot set later registration fields during basic registration.
6) Checks that the first name only contains Alphabetical characters
7) Checks that the first name is at least two characters long. 
8) Checks that the last name only contains Alphabetical characters
9) Checks that the last name is at least two characters long. 
10) Checks that the username is alphanumeric and does not contain spaces. 
11) Checks that invalid email addresses are rejected. 
12) Checks that password is eight or more characters long. 
13) Checks that password matches confirmation password. 
14) Checks that a users age is between 16 and 120
15) Checks that the users country is equal to USA, UK, INDIA or Germany
16) Checks the user has accepted the terms and conditions. 
*/

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

console.log('Begining basicRegistration.js tests')

//Empty the test database before starting
User.remove({}, function(err) { 
 })

// 1) Tests for correct registration data. 
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

// 2) Tests to check that a request with additional field fails
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

// 3) Tests to check that requests with a missing field fails.
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

// 4) Checks that request fails for all values that should be a string.
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

// 5) Checks to see that user cannot set later registration fields during basic registration.
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

// 6) Checks that the first name only contains Alphabetical characters
describe('Checks that first name fails when non aphabetical characters are included', () => {
    it('It should have a validation error because first name contains a numeric character.', (done) => {
        var newUser = {
            firstName: "Michelle2",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan@gmail.com",
            age: 20,
            password: "whitehouse",
            confirmPassword: "whitehouse",
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
// 7) Checks that the first name is at least two characters long. 
describe('Checks that first name fails when it is less than two characters', () => {
    it('It should have a validation error because first name is only one character long.', (done) => {
        var newUser = {
            firstName: "M",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan@gmail.com",
            age: 20,
            password: "whitehouse",
            confirmPassword: "whitehouse",
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

// 8) Checks that the last name only contains Alphabetical characters
describe('Checks that last name fails when it contains non alphabetical characters', () => {
    it('It should have a validation error because last name is equal to three numeric digits.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "222",
            userName: "MichelleRogan",
            email: "michelleRogan@gmail.com",
            age: 20,
            password: "whitehouse",
            confirmPassword: "whitehouse",
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

// 9) Checks that the last name is at least two characters long. 
describe('Checks that last name fails when it is less than two characters long', () => {
    it('It should have a validation error because last name is a single character.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "R",
            userName: "MichelleRogan",
            email: "michelleRogan@gmail.com",
            age: 20,
            password: "whitehouse",
            confirmPassword: "whitehouse",
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

// 10) Checks that the username is alphanumeric and does not contain spaces. 
describe('Checks that username is alphanumeric and does not contain spaces', () => {
    it('It should have a validation error because username has a question mark in it.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "?Michelle Rogan",
            email: "michelleRogan@gmail.com",
            age: 20,
            password: "whitehouse",
            confirmPassword: "whitehouse",
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

// 11) Checks that invalid email addresses are rejected. 
describe('Checks that invalid emails are rejected', () => {
    it('It should have a validation error because the email address does not have the "@" symbol.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "Michelle Rogan",
            email: "michelleRogan.gmail.com",
            age: 20,
            password: "whitehouse",
            confirmPassword: "whitehouse",
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

// 12) Checks that password is eight or more characters long. 
describe('Checks that passwords less than eight characters are rejected', () => {
    it('It should have a validation error because password is not equal to confirmation password.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan.gmail.com",
            age: 20,
            password: "12345678",
            confirmPassword: "123456789",
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

// 13) Checks that password matches confirmation password. 
describe('Checks that password mathces confirmation password', () => {
    it('It should have a validation error because password is less than eight characters long.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan.gmail.com",
            age: 20,
            password: "123",
            confirmPassword: "123",
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

// 14) Checks that a users age is between 16 and 120
describe('Checks that age is between 16 and 120', () => {
    it('It should have a validation error because users age is less than 16.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan.gmail.com",
            age: 15,
            password: "12345678",
            confirmPassword: "12345678",
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

// 15) Checks that the users country is equal to USA, UK, INDIA or Germany
describe('Checks that users country is equal to USA, UK, India or Germany', () => {
    it('It should have a validation error because country is equal to france which is unsupported.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan.gmail.com",
            age: 20,
            password: "12345678",
            confirmPassword: "12345678",
            country: "France",
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
// 16) Checks the user has accepted the terms and conditions. 
describe('Checks that user has accepted terms and condition', () => {
    it('It should have a validation error because country is equal to france which is unsupported.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan.gmail.com",
            age: 20,
            password: "12345678",
            confirmPassword: "12345678",
            country: "France",
            terms: null
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

//Empties test database.
User.remove({}, function(err) { 
})