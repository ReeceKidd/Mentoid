/*
Checks that a string contains only alphabetical characters no white space. 
*/
module.exports = function alpha(req, field, minLength, maxLength) {
    req.check(field, field + ' can only contain Alphabetical characters').isAlpha()
    req.check(field, field + ' must be at least ' + minLength + ' characters long').isLength({
        min: minLength
    })
    req.check(field, field + ' cannot be greater than ' + maxLength + ' characters long').isLength({
        max: maxLength
    })
}