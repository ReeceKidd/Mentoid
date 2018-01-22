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

console.log('Begining beginning updateAreasOfInterest.js tests')

//Empty the test database before starting
User.remove({}, function (err) {})

// Registers user needed to test update areas of interest.js.  
describe('Test for valid registration', () => {
    var newUser = {
        firstName: "Sarah",
        lastName: "Kilgore",
        userName: "SarahKilgore",
        email: "sarahkilgore@gmail.com",
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

// Stores user ID needed to perform tests
var retrievedUserID = ''

// Gets user ID needed to perform tests
describe('Retrieves user ID from successfully registered user', () => {
    it('It should retrieve userID', (done) => {
        chai.request(server)
            .get('/get-single-user-ID')
            .end((err, res) => {
                res.should.have.status(200)
                retrievedUserID = res.body._id
                done()
            })
    })
})


// 1) Checks for successful update of areas of interest
describe('Update areas of interest successfully', () => {
    it('It should have update areas of interest successfully', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                    value: 'Yoga',
                    years: 10,
                    areaOfInterestID: 0
                }],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

// 2) Checks that areas of interest update fails because of unwanted additional fields in request.
describe('Additional unwanted fields in request', () => {
    it('It should fail because of additional field in request', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                    value: 'Yoga',
                    years: 10,
                    areaOfInterestID: 0
                }],
                _id: retrievedUserID,
                age: 16,
                additionalField: 'Additional information'
            })
            .end((err, res) => {
                res.should.have.status(700)
                res.body.should.have.property('error').eql('Additional fields found')
                done()
            })
    })
})

// 3) Checks that areas of interest with the exact same value throw a duplication error. 
describe('Exact same values thow a duplication error', () => {
    it('It should fail because there are two areas of interest with the value "yoga"', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                        value: 'Yoga',
                        years: 10,
                        areaOfInterestID: 0
                    },
                    {
                        value: 'Yoga',
                        years: 10,
                        areaOfInterestID: 0
                    }
                ],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(800)
                res.body.should.have.property('error').eql('Duplicate values')
                done()
            })
    })
})

// 4) Checks that areas of interest with different case same values throw a duplication error. 
describe('Exact same values different case format thow a duplication error', () => {
    it('It should fail because there are three areas of interest with the value "yoga" defning yoga in different case formats', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                        value: 'YoGa',
                        years: 10,
                        areaOfInterestID: 0
                    },
                    {
                        value: 'yogA',
                        years: 10,
                        areaOfInterestID: 0
                    },
                    {
                        value: 'yoga',
                        years: 10,
                        areaOfInterestID: 0
                    }
                ],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(800)
                res.body.should.have.property('error').eql('Duplicate values')
                done()
            })
    })
})

// 5) Checks that areas of interest with different case same values throw a duplication error. 
describe('Exact same values different case format thow a duplication error', () => {
    it('It should fail because there are three areas of interest with the value "yoga" defning yoga in different case formats', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                        value: 'YoGa',
                        years: 10,
                        areaOfInterestID: 0
                    },
                    {
                        value: 'yogA',
                        years: 10,
                        areaOfInterestID: 0
                    },
                    {
                        value: 'yoga',
                        years: 10,
                        areaOfInterestID: 0
                    }
                ],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(800)
                res.body.should.have.property('error').eql('Duplicate values')
                done()
            })
    })
})

// 6) Checks that the user ID is equal to a string. 
describe('Checks that user ID is equal to a string', () => {
    it('It should fail because user ID is equal to a number', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                    value: 'YoGa',
                    years: 10,
                    areaOfInterestID: 0
                }],
                _id: 123,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 7) Checks that the userID is not an empty string. 
describe('Checks that user ID is not an empty string', () => {
    it('It should fail because user ID is equal to an empty string', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                    value: 'YoGa',
                    years: 10,
                    areaOfInterestID: 0
                }],
                _id: "",
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(400)
                done()
            })
    })
})

// 8) Checks that age is a number. 
describe('Checks that age is a number', () => {
    it('It should fail because age is a string value', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                    value: 'YoGa',
                    years: 10,
                    areaOfInterestID: 0
                }],
                _id: retrievedUserID,
                age: "sixteen"
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 9) Checks that age exists
describe('Checks that age exists', () => {
    it('It should fail because the request does not have an age field', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                    value: 'YoGa',
                    years: 10,
                    areaOfInterestID: 0
                }],
                _id: retrievedUserID
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 10) Checks that age is in valid number range.
describe('Checks that age is a valid number', () => {
    it('It should fail because age is 15 which is outside the bounds of 16-120', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                    value: 'YoGa',
                    years: 10,
                    areaOfInterestID: 0
                }],
                _id: retrievedUserID,
                age: 15
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 11) Checks that the array contains at least one area of interest.
describe('Checks that the areasOfInterest array contains at least one area of interest', () => {
    it('It should fail because the arrays of interest array is empty', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 12) Checks that each area of interest contains only the fields, value, years, and ID.
describe('Checks that each area of interest contains only the fields, value, years and ID', () => {
    it('It should fail because the area of interest contains an additional field', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                    value: 'Yoga',
                    years: 10,
                    areaOfInterestID: 0,
                    additionalField: 'additional information'
                }],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 13) Checks that each area of interest is an object.
describe('Checks that every value in areas of interest array is an object', () => {
    it('It should fail because the area of interest array contains a string value', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                        value: 'Yoga',
                        areaOfInterestID: 0,
                    },
                    "String value"
                ],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(500)
                done()
            })
    })
})

// 14) Checks that each area of interest has defined value, years and ID. 
describe('Checks that each area of interest contains the fields, value, years and ID', () => {
    it('It should fail because the area of interest is missing the years field', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                    value: 'Yoga',
                    areaOfInterestID: 0,
                }],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 15) Checks that a value is defined for every area of interest. 
describe('Checks that value is defined for every area of interest', () => {
    it('It should fail because area of interests value is equal to an empty string', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                    value: '',
                    areaOfInterestID: 0,
                    years: 10
                }],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 16) Checks that the value is a string value. 
describe('Checks that value is a string value', () => {
    it('It should fail because area of interests value is equal to 123', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                        value: 'Yoga',
                        areaOfInterestID: 0,
                        years: 10
                    },
                    {
                        value: 123,
                        areaOfInterestID: 0,
                        years: 10
                    }
                ],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(500)
                done()
            })
    })
})

// 17) Checks that the value only contains letters and whitespace. 
describe('Checks that value only contains letters and whitespace', () => {
    it('It should fail because value contains a question mark', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                        value: 'Yoga?',
                        areaOfInterestID: 0,
                        years: 10
                    }
                ],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 18) Checks that the "years" field is defined.  
describe('Checks that the years field is definied', () => {
    it('It should fail because years is a blank string', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                        value: 'Yoga',
                        areaOfInterestID: 0,
                        years: ''
                    }
                ],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 19) Checks that the years field is an integer. 
describe('Checks that the years field is an integer', () => {
    it('It should fail because years is a double', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                        value: 'Yoga',
                        areaOfInterestID: 0,
                        years: 3.14
                    }
                ],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 20) Checks that years of experience is not greater than the users age.
describe('Checks that years of experience is not greater than the users age', () => {
    it('It should fail because years of experience is greater than the users age', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                        value: 'Yoga',
                        areaOfInterestID: 0,
                        years: 30
                    }
                ],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 21) Checks the area of interest ID field is defined. 
describe('Checks that area of interest ID is defined', () => {
    it('It should fail because area of interest id is undefined', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                        value: 'Yoga',
                        areaOfInterestID: null,
                        years: 3
                    }
                ],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

// 22) Checks the area of interest ID field is an integer. 
describe('Checks that the area of interest ID field is an integer', () => {
    it('It should fail because area of interest id is a string', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                areasOfInterest: [{
                        value: 'Yoga',
                        areaOfInterestID: null,
                        years: "Three"
                    }
                ],
                _id: retrievedUserID,
                age: 16
            })
            .end((err, res) => {
                res.should.have.status(600)
                res.body.should.have.property('error').eql('Validation failure')
                done()
            })
    })
})

//Empties test database.
User.remove({}, function (err) {})