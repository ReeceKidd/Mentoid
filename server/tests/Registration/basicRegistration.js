/*
These tests are used to check the registration controllers register method. 
Tests in this section.

General Tests
- Correct data passes. 
- Request with additional field fails
- User cannot set data that will be set by the backend.

firstName: isAlpha String tests.
lastName: isAlpha String tests
userName: isAlphaNumeric String tests

passwordChecks
- Checks that password is eight or more characters long. 
- Checks that password matches confirmation password. 

age Checks
- Checks that a users age is between 16 and 120

languageChecks
- Checks that the users has entered a supported language
- Checks that if the users language is Spanish it passes 
- Checks if the users language is English it passes
- Checks if users language is French it passes.
- Checks that if the users language is German it passes.

termsChecks
- Checks the user has accepted the terms and conditions. 
*/

/*
The test data supplied in the following tests need to have different emails and usernames otherwise the tests fail.
*/
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

var server = require('../../src/app.js');
var User = require('../../models/user.js');

var should = chai.should();
chai.use(chaiHttp);

console.log('Begining basicRegistration.js tests')

//Empty the test database before starting
User.remove({}, function (err) {})

// 1) Correct data passes.  
describe('Test for valid registration', () => {
    var newUser = {
        firstName: "Sarah",
        lastName: "Robson",
        userName: "SarahRobson",
        email: "sarahrobson@gmail.com",
        age: "20",
        password: "12345678",
        confirmPassword: "12345678",
        language: "English",
        terms: "true"
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

const requestObject = {
    firstName: "Tom",
    lastName: "Hope",
    userName: "Tommy123",
    email: "tom-hope@gmail.com",
    age: "20",
    password: "12345678",
    confirmPassword: "12345678",
    language: "English",
    terms: "true"
}

// Request with additional field fails
describe('Checks for additional unwanted fields in request', () => {
    it('It should have error because of additional field in user', (done) => {
        var newUser = {
            firstName: "Tom",
            lastName: "Hope",
            userName: "Tommy123",
            email: "tom-hope@gmail.com",
            age: "20",
            password: "12345678",
            confirmPassword: "12345678",
            language: "English",
            terms: "true"
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

// User cannot set data that will be set by the backend.
describe('Checks that user has not tried to set later registration', () => {
    it('It should have an error because user has tried to set later registration values to true.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan@gmail.com",
            age: "20",
            password: "whitehouse",
            confirmPassword: "whitehouse",
            language: "English",
            terms: "true",
            basicRegistrationComplete: "true"
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

/*
firstName, lastName and userName are tested with the generated code. 
*/
const testAlphaString = require('../TestGenerator/String/isAlpha')
const testAlphaNumericString = require('../TestGenerator/String/isAlphaNumeric')
testAlphaString('firstName', 2, 100, requestObject, '/register', server)
testAlphaString('lastName', 2, 100, requestObject, '/register', server)
testAlphaNumericString('userName', 2, 50, requestObject, '/register', server)

// Checks that invalid email addresses are rejected. 
describe('Checks that invalid emails are rejected', () => {
    it('It should have a validation error because the email address does not have the "@" symbol.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "Michelle Rogan",
            email: "michelleRogan.gmail.com",
            age: "20",
            password: "whitehouse",
            confirmPassword: "whitehouse",
            language: "English",
            terms: "true"
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

//  Checks that password is eight or more characters long. 
describe('Checks that passwords less than eight characters are rejected', () => {
    it('It should have a validation error because password is not equal to confirmation password.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan.gmail.com",
            age: "20",
            password: "12345678",
            confirmPassword: "123456789",
            language: "English",
            terms: "true"
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

//  Checks that password matches confirmation password. 
describe('Checks that password mathces confirmation password', () => {
    it('It should have a validation error because password is less than eight characters long.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan.gmail.com",
            age: "20",
            password: "123",
            confirmPassword: "123",
            language: "English",
            terms: "true"
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

//  Checks that a users age is between 16 and 120
describe('Checks that age is between 16 and 120', () => {
    it('It should have a validation error because users age is less than 16.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan.gmail.com",
            age: "15",
            password: "12345678",
            confirmPassword: "12345678",
            language: "English",
            terms: "true"
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

//  Checks that the users has entered a supported language
describe('Checks that users language is supported', () => {
    it('It should fail because user has entered "Chinese".', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan.gmail.com",
            age: "20",
            password: "12345678",
            confirmPassword: "12345678",
            language: "Chinese",
            terms: "true"
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
//  Checks that if the users language is Spanish it passes
describe('Checks that if the users language is equal to Spanish it passes', () => {
    it('It should pass as "Spanish" was selected.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "SpanishUser",
            email: "spaintest@gmail.com",
            age: "20",
            password: "12345678",
            confirmPassword: "12345678",
            language: "Spanish",
            terms: "true"
        }
        chai.request(server)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                res.should.have.status(200)
                done()
            })
    })
})
//  Checks if the users language is English it passes
describe('Checks if the users language is English it passes', () => {
    it('It should pass as "English" was selected.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "UKUser",
            email: "ukuser@gmail.com",
            age: "20",
            password: "12345678",
            confirmPassword: "12345678",
            language: "English",
            terms: "true"
        }
        chai.request(server)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                res.should.have.status(200)
                done()
            })
    })
})
//  Checks if users language is French it passes.
describe('Checks if users language is French it passes', () => {
    it('It should pass as "French" was selected.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "USAUser",
            email: "usauser@gmail.com",
            age: "20",
            password: "12345678",
            confirmPassword: "12345678",
            language: "French",
            terms: "true"
        }
        chai.request(server)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                res.should.have.status(200)
                done()
            })
    })
})
//  Checks that if the users language is German it passes.
describe('Checks that if users language is German it passes', () => {
    it('It should pass as "German" was selected.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "GermanUser",
            email: "germanuser@gmail.com",
            age: "20",
            password: "12345678",
            confirmPassword: "12345678",
            language: "German",
            terms: "true"
        }
        chai.request(server)
            .post('/register')
            .send(newUser)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                }
                res.should.have.status(200)
                done()
            })
    })
})
//  Checks the user has accepted the terms and conditions. 
describe('Checks that user has accepted terms and condition', () => {
    it('It should fail because terms and conditions are equal to null.', (done) => {
        var newUser = {
            firstName: "Michelle",
            lastName: "Rogan",
            userName: "MichelleRogan",
            email: "michelleRogan.gmail.com",
            age: "20",
            password: "12345678",
            confirmPassword: "12345678",
            language: "English",
            terms: "null"
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
User.remove({}, function (err) {})