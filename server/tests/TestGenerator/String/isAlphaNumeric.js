var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
chai.use(chaiHttp)

const stringTestCode = require('../../TestGenerator/String/string')

//Type checks. 
const checkString = require('../../../ParameterChecker/checkString')
const checkNumber = require('../../../ParameterChecker/checkNumber')
const checkObject = require('../../../ParameterChecker/checkObject')
const checkFunction = require('../../../ParameterChecker/checkFunction')

/*
This method generates string tests for an alphabetical string
It performs the normal string tests and then checks that a string 
containing a space fails and a string containing a number fails. 
*/

module.exports = function testAlphaString(field, minLength, maxLength, requestObject, route, server) {
    
    //Checks to make sure valid parameters where passed to the test. 
    checkString(field)
    checkNumber(minLength)
    checkNumber(maxLength)
    checkObject(requestObject)
    checkString(route)
    checkFunction(server)

    //Performs the general string tests. 
    stringTestCode(field, minLength, maxLength, requestObject, route, server)

    // 1) Checks that string with spaces fails.
    describe('Checks that ' + field + ' fails because of space', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = "value value"
        it('It should have a validation error because ' + field + ' contains a space.', (done) => {
            chai.request(server)
                .post(route)
                .send(copyOfRequestObject)
                .end((err, res) => {
                    res.should.have.status(600)
                    res.body.should.have.property('error').eql('Validation failure')
                    done()
                })
        })
    })

    // 2) Checks that string with number passes.
    describe('Checks that ' + field + ' fails because of space', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject.email = 'testabc@abc.com'
        copyOfRequestObject.userName = 'random123'
        copyOfRequestObject[field] = "user123"
        it('It should pass even through it has the numbers 123.', (done) => {
            chai.request(server)
                .post(route)
                .send(copyOfRequestObject)
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
    })

}