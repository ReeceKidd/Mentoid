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

console.log('Begining beginning updateAJobHistory.js tests')

//Empty the test database before starting
User.remove({}, function (err) {})

// Registers user needed to test update job history.js.  
describe('Test for valid registration', () => {
    var newUser = {
        firstName: "Job",
        lastName: "History",
        userName: "JobHistory",
        email: "jobhistory@gmail.com",
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

// Stores age. 
var retrievedAge = ''

// Gets user Age needed to perform the tests. 
describe('Retrieves user age from successfully registered user', () => {
    it('It should retrieve userID', (done) => {
        chai.request(server)
            .get('/get/age/' + retrievedUserID)
            .end((err, res) => {
                res.should.have.status(200)
                retrievedAge = res.body.age
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
                    startYear: '2004',
                    endYear: '2010',
                    isWorkingHere: 'No'
                }],
                _id: retrievedUserID,                
                age: retrievedAge 
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
            .post('/update/job-history')
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

const requestObject = {
    experiences: [{
        title: 'Software Engineer',
        company: 'Google',
        startYear: '2004',
        endYear: '2010',
        isWorkingHere: 'No'
    }],
    _id: retrievedUserID,
    age: retrievedAge
   
}

const testObjectID = require('../TestGenerator/objectID')
const testAlphaString = require('../TestGenerator/String/isAlpha')
const testAlphaNumericString = require('../TestGenerator/String/isAlphaNumeric')


testObjectID('_id', requestObject, '/update/job-history/', server)
testAlphaString('title', 2, 100, requestObject.experiences[0], '/update/job-history/', server)
testAlphaString('company', 2, 100, requestObject.experiences[0], '/update/job-history/', server)

