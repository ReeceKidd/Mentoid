var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
chai.use(chaiHttp)

//Type checks. 
const checkString = require('../../../ParameterChecker/checkString')
const checkObject = require('../../../ParameterChecker/checkObject')
const checkFunction = require('../../../ParameterChecker/checkFunction')

module.exports = function stringTests(objectID, requestObject, route, server) {

    //Checks to make sure valid parameters where passed to the test. 
    checkString(objectID)
    checkObject(requestObject)
    checkString(route)
    checkFunction(server)

    // 1) Is of type string
    describe('Checks that ' + field + ' fails because it is an integer', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = 999
        it('It should have Invalid type error because ' + field + ' is an integer.', (done) => {
            chai.request(server)
                .post(route)
                .send(copyOfRequestObject)
                .end((err, res) => {
                    res.should.have.status(850)
                    res.body.should.have.property('error').eql('Invalid type')
                    done()
                })
        })
    })

    // 2) Is defined. 
    describe('Checks that ' + field + ' fails when it is undefined', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = undefined
        it('It should have a validation error because ' + field + ' is undefined.', (done) => {
            chai.request(server)
                .post(route)
                .send(copyOfRequestObject)
                .end((err, res) => {
                    res.should.have.status(950)
                    res.body.should.have.property('error').eql('Undefined field')
                    done()
                })
        })
    })

    // 3) Field is not included in request
    describe('Checks that ' + field + ' fails when it is not included in request', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        delete copyOfRequestObject[field]
        it('It should have a validation error because ' + field + ' is not included in request.', (done) => {
            chai.request(server)
                .post(route)
                .send(copyOfRequestObject)
                .end((err, res) => {
                    res.should.have.status(950)
                    res.body.should.have.property('error').eql('Undefined field')
                    done()
                })
        })
    })

    // 4) String to big for server to handle. 
    describe('Checks that ' + field + ' fails because it is too big', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = generateBigString()
        it('It should have a validation error because ' + field + ' is to large. ', (done) => {
            chai.request(server)
                .post(route)
                .send(copyOfRequestObject)
                .end((err, res) => {
                    res.should.have.status(413)
                    done()
                })
        })
    })

    // 5) Is a valid Object ID.
}