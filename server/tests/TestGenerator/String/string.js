// 1) Is of type string
// 2) Is defined. 
// 3) Field is not included in request
// 4) String to big for server to handle. 
// 5) Max length check
// 6) Min length check
// 7) Not equal to null
// 8) Not equal to blank space.
// 9) String is not a number value. 
// 10) Checks than non alphabetical and numeric characters fail. 
// 11) Checks for cross site scripting. 
// 12) Check for NoSQL injection. 

var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
chai.use(chaiHttp)

const checkParameters = require('../../../ParameterChecker/checkParameterType')

module.exports = function stringTests(field, minLength, maxLength, requestObject, route, server) {

    //Checks to make sure valid parameters where passed to the test. 
    checkParameters.checkForString(field)
    checkParameters.checkForNumber(minLength)
    checkParameters.checkForNumber(maxLength)
    checkParameters.checkForObject(requestObject)
    checkParameters.checkForString(route)
    checkParameters.checkForFunction(server)

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

    // 5) Max length check
    describe('Checks that ' + field + ' fails because it is larger than the maximum number of characters: ( ' + maxLength + ' )', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = generateStringOfCharacters(maxLength + 50)
        it('It should have a validation error because ' + field + ' is larger than ' + maxLength + ' characters.', (done) => {
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

    // 6) Min length check
    describe('Checks that ' + field + ' fails because it is less than the minimum number of characters: ( ' + minLength + ' )', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = ''
        it('It should have a validation error because ' + field + ' is less than ' + minLength + ' characters.', (done) => {
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

    // 7) Not equal to null
    describe('Checks that ' + field + ' fails because it is equal to null', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = null
        it('It should have a validation error because ' + field + ' is equal to null.', (done) => {
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

    // 8) Not equal to blank space
    describe('Checks that ' + field + ' fails because it is equal to ""', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = ""
        it('It should have a validation error because ' + field + ' is equal to "".', (done) => {
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

    // 9) String is not a number value
    describe('Checks that ' + field + ' fails because it contains a number value', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = "999"
        it('It should have a validation error because ' + field + ' is equal to 999.', (done) => {
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

    // 10) Checks than non alphabetical and numeric characters fail. 
    describe('Checks that ' + field + ' fails because of special characters', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = "-?@#"
        it('It should have a validation error because ' + field + ' of special characters.', (done) => {
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

    // 11) Cross site scripting test. 
    describe('Checks that ' + field + ' fails because of potential cross site scripting ', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = "<script>&&</script>"
        it('It should have a validation error because ' + field + ' constains special characters <script>&&</script>.', (done) => {
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

    

    // 12) NoSQL injection is preveneted.
    describe('Checks that ' + field + ' fails because of attempted NoSQL injection', () => {
        var copyOfRequestObject = Object.assign({}, requestObject);
        copyOfRequestObject[field] = "$ne : 1"
        it('It should have a validation error because ' + field + ' contains $ which is prohibited.', (done) => {
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

function generateBigString() {
    var string = "1234567890";
    var iterations = 20;
    for (var i = 0; i < iterations; i++) {
        string += string;
    }
    return string
}

function generateStringOfCharacters(numberOfCharacters) {
    return Array(numberOfCharacters).join("X") // create string with 10 as "aaaaaaaaaa"
}