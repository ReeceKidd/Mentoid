process.env.NODE_ENV = 'test'

let mongoose = require("mongoose")
let User = require('../models/user.js')

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

chai.use(chaiHttp)

describe('Users', () => {
    //Before each test the database is emptied of users. 
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        })
    })
})

describe('Get all users. ', () => {
    it('It should GET all the users', (done) => {
        chai.request('http://localhost:4000/admin/get-users').end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
})