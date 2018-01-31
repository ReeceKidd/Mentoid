var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
chai.use(chaiHttp)

const checkParameters = require('../../../ParameterChecker/checkParameterType')
const stringTestCode = require('../../TestGenerator/String/string')

/*
This method generates string tests for an alphabetical string
*/

module.exports = function testAlphaString(field, minLength, maxLength, requestObject, route, server) {
    
    //Checks to make sure valid parameters where passed to the test. 
    checkParameters.checkForString(field)
    checkParameters.checkForNumber(minLength)
    checkParameters.checkForNumber(maxLength)
    checkParameters.checkForObject(requestObject)
    checkParameters.checkForString(route)
    checkParameters.checkForFunction(server)

    //Performs the general string tests. 
    stringTestCode(field, minLength, maxLength, requestObject, route, server)

    // 11) Checks that string with spaces fails.
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

    // 11) Checks that string with number fails.
    describe('Checks that ' + field + ' fails because of space', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = "abc1"
        it('It should have a validation error because ' + field + ' contains a number.', (done) => {
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



    
}
