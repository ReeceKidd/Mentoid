var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

module.exports = function testAlphaString(field, minLength, maxLength, requestObject, route, server) {
    checkParameters(field, minLength, maxLength, requestObject, route, server)

    // 1) Is of type string
    // 2) Is defined. 
    // 3) Field is not included in request
    // 4) String to big for server to handle. 
    // 5) Max length check
    // 6) Min length check
    // 7) Not equal to null
    // 8) Not equal to blank space.
    // 9) String is not a number value. 
    // 10) Special characters are escaped. 
    // 11) Check for NoSQL injection. 
    // 12) (Optional) Alphabetical characters only
    // 13) (Optional) Alphabetical and numeric characters only
    // 14) (Optional) Alphabetical and space values allowed.

    //Is a string 

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

    describe('Checks that ' + field + ' fails when it is undefined', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = undefined
        it('It should have a validation error because ' + field + ' is undefined.', (done) => {
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

    describe('Checks that ' + field + ' fails when it is not included in request', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        delete copyOfRequestObject[field]
        it('It should have a validation error because ' + field + ' is not included in request.', (done) => {
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

    describe('Checks that ' + field + ' fails when it is larger than the ' + maxLength, () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = generateBigString()
        it('It should have a validation error because ' + field + ' is not included in request.', (done) => {
            chai.request(server)
                .post(route)
                .send(copyOfRequestObject)
                .end((err, res) => {
                    res.should.have.status(413)
                    done()
                })
        })
    })
}

function generateBigString() {
    var string = "1234567890";
    var iterations = 20;
    for (var i = 0; i < iterations; i++) {
        string += string;
    }
    return string
}

function checkParameters(field, minLength, maxLength, requestObject, route, server) {
    var stringText = 'string'
    var numberText = 'number'
    var objectText = 'object'
    var mustBe = ' must be a '

    if (typeof field !== 'string') {
        throw new Error(field + mustBe + stringText)
    }

    if (typeof minLength !== 'number') {
        throw new Error(minLength + mustBe + numberText)
    }

    if (typeof maxLength !== 'number') {
        throw new Error(maxLength + mustBe + numberText)
    }

    if (typeof requestObject !== 'object') {
        throw new Error(requestObject + mustBe + objectText)
    }

    if (typeof route !== 'string') {
        throw new Error(route + mustBe + stringText)
    }

    if (typeof server !== 'function') {
        throw new Error(server + mustBe + objectText)
    }
}