/* 
Checks that string requests are valid. 

Parameters: 

String field: The field of the value that is being validated.
Array arrayToCheck: The Array to Check.  
int minLength: The minimum length of the string. 
int maxLength: The maximum length of the string. 

Validations: 

1) Length is not zero.
2) isArray 
2) Max length check
3) Min length check
4) Not equal to null
 */

module.exports = function validateArray(field, arrayToCheck, minimumLength, maximumLength) {

    checkParameters(field, minimumLength, maximumLength)

    if (arrayToCheck.length === 0) {
        return field + ' cannot be 0 characters in length'
    }

    if (arrayToCheck.length > maximumLength) {
        return field + ' cannot exceed ' + maximumLength + ' characters in length.'
    }

    if (arrayToCheck.length < minimumLength) {
        return field + ' cannot be less than ' + minimumLength + ' characters in length.'
    }

    if (arrayToCheck === null) {
        return field + ' cannot equal null'
    }

    if (arrayToCheck === "") {
        return field + ' cannot be a blank space'
    }

    if (!isNaN(arrayToCheck)) {
        return field + ' cannot be a number ( ' + arrayToCheck +' )' 
    }

}

function checkParameters(field, minLength, maxLength) {

    if(typeof field !== 'string') {
        throw TypeError
    }

    if (typeof minLength !== 'number') {
        throw TypeError
    }

    if (typeof maxLength !== 'number') {
        throw TypeError
    }

}