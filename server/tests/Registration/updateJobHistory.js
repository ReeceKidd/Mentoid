/*

Tests completed for the update Job History..
1) Checks for successful update of areas of interest
2) Checks that areas of interest update fails because of unwanted additional fields in request.
3) Checks that areas of interest with the exact same value throw a duplication error.
4) Checks that areas of interest with different case same values throw a duplication error. 
5) Checks that the user ID is equal to a string. 
6) Checks that the userID is not an empty string. 
7) Checks that age is a number. 
8) Checks that age exists
9) Checks that age is in valid number range.
10) Checks that the areasOfInterest array contains at least one area of interest.
11) Checks that each area of interest contains only the fields, value, years, and ID.
12) Checks that each area of interest is an object.
13) Checks that each area of interest has defined value, years and ID. 
14) Checks that a value is defined for every area of interest. 
15) Checks that the value is a string value. 
16) Checks that the value only contains letters and whitespace. 
17) Checks that the "years" field is defined.  
18) Checks that the years field is an integer.
19) Checks that years of experience is not greater than the users age.
20) Checks the area of interest ID field is defined. 
21) Checks the area of interest ID field is an integer.
//22) Checks the get method returns only the editable fields for the registerController.getAreasOfInterest method.  
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

console.log('Begining beginning updateAreasOfInterest.js tests')

//Empty the test database before starting
User.remove({}, function (err) {})

// Registers user needed to test update areas of interest.js.  
describe('Test for valid registration', () => {
    var newUser = {
        firstName: "Mike",
        lastName: "Burns",
        userName: "MikeBurns",
        email: "mikeBurns@gmail.com",
        age: 20,
        password: "12345678",
        confirmPassword: "12345678",
        language: "English",
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


// 1) Checks for successful update of job history
describe('Update job history successfully', () => {
    it('It should update job history successfully', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/job-history')
            .send({
                experiences: [{
                    experienceID: '1',
                    title: 'Software Engineer',
                    company: 'Google',
                    startDate: '2004',
                    endDate: '2010',
                    isWorkingHere: 'false'
                }],
                _id: retrievedUserID
            })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

// 2) Checks that updating job history fails because of unwanted additional fields in request.
describe('Additional unwanted fields in request', () => {
    it('It should fail because of additional field in request', (done) => {
        var areasOfInterest = {}
        chai.request(server)
            .post('/update/areas-of-interest')
            .send({
                experiences: [{
                    title: 'Software Engineer',
                    company: 'Google',
                    startDate: 2004,
                    endDate: 2010,
                    isStillWorkingHere: false
                }],
                _id: retrievedUserID,
                additionalField: 'Additional information'
            })
            .end((err, res) => {
                res.should.have.status(700)
                res.body.should.have.property('error').eql('Additional fields found')
                done()
            })
    })
})
