process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

var server = require('../src/app.js');
var User = require('../models/user.js');

var should = chai.should();
chai.use(chaiHttp);

const newUser = {
    firstName: "Reece",
    lastName: "Kidd",
    userName: "Reece8899Kidd",
    email: "reecekidd12384666@gmail.com",
    age: 20,
    areasOfInterest: [],
    password: "Milkshake1",
    confirmPassword: "Milkshake1",
    country: "USA",
    terms: true,
    basicRegistrationComplete: true,
    areasOfInterestRegistrationComplete: false,
    userRegistrationComplete: false
}

/*
Tests completed. Need to create test folders and run tests for each of the methods. 
*/

describe('Empty Test Database', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
            done()
        })
    })

    // Tests for correct registration data. 
    describe('/register', () => {
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
    describe('register', () => {
        it('It should have error because of additional field in user', (done) => {
            newUser.additionalField = 'additional information'
            chai.request(server)
                .post('/register')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(500)
                    res.body.should.have.property('error').eql('Additional fields found')
                    done()
                })
        })
    })

    //Tests to check that requests with a missing field fails.
    describe('register', () => {
        it('It should have error in response because of a lack of firstName field in request', (done) => {
            delete newUser.firstName
            delete newUser.additionalField
            chai.request(server)
                .post('/register')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(500)
                    res.body.should.have.property('error').eql('Validation failure')
                    done()
                })
        })
    })

    //Checks that request fails for all values that should be a string.
    describe('register', () => {
        it('It should have error in response because of string values being numbers', (done) => {
            newUser.userName = 1
            newUser.firstName = 1
            newUser.lastName = 1
            newUser.email = 1
            newUser.password = 1
            newUser.confirmPassword = 1
            chai.request(server)
                .post('/register')
                .send(newUser)
                .end((err, res) => {
                    if(err) {
                        console.log(err)
                    }
                    res.should.have.status(500)
                    res.body.should.have.property('error').eql('Validation failure')
                    done()
                })
        })
    })
    //Checks to see if request fails if strings are entered where a number should be used. 
    describe('register', () => {
        it('It should have error because string is used where there should be a number', (done) => {
            newUser.age = '11'
            chai.request(server)
                .post('/register')
                .send(newUser)
                .end((err, res) => {
                    if(err) {
                        console.log(err)
                    }
                    res.should.have.status(500)
                    res.body.should.have.property('error').eql('Validation failure')
                    done()
                })
        })
    })
    //Checks to see that initial areas of Interest array is empty. 
    describe('register', () => {
        it('It should have error because initial areas of Interest array is not empty.', (done) => {
            newUser.age = '11'
            chai.request(server)
                .post('/register')
                .send(newUser)
                .end((err, res) => {
                    if(err) {
                        console.log(err)
                    }
                    res.should.have.status(500)
                    res.body.should.have.property('error').eql('Validation failure')
                    done()
                })
        })
    }) 
    //Checks to see that check em
})