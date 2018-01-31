/* 
Checks that string requests are valid. 

Parameters: 

String field: The field of the value that is being validated.
String stringToCheck: The string to check.  
int minLength: The minimum length of the string. 
int maxLength: The maximum length of the string.
Boolean isAlpha: Checks if the string only contains alphabetical characters. 
Boolean isAlphaNumeric: Checks if the string only contains alphabetical and numeric characters. 
Boolean isAlphaWitSpace: Checks if the string contains only alphabetical and white space characters. 

Validations: 

1) Length is not zero. 
2) Max length check
3) Min length check
4) Not equal to null
5) Not equal to blank space. 
6) String value not equal to a number. . 
7) (Optional) Alpha allows only aplphabetical characters.
8) (Optional) AlphNumeric  alphabetical and numeric.
9) (Optional) AlphaWithSpace alphabetical and space characters only. 
 */

const alphaValidation = require('../CustomValidators/alpha')
const alphaNumericValidation = require('../CustomValidators/alphaNumeric')
const alphaWithSpaceValidation = require('../CustomValidators/alphaWithSpace')


module.exports = function validateString(field, stringToCheck, minimumLength, maximumLength, isAlpha, isAlphaNumeric, isAlphaWithSpaces) {

    checkParameters(field, minimumLength, maximumLength, isAlpha, isAlphaNumeric, isAlphaWithSpaces)

    console.log(stringToCheck.length)

    if (stringToCheck.length === 0) {
        return field + ' cannot be 0 characters in length'
    }

    if (stringToCheck.length > maximumLength) {
        return field + ' cannot exceed ' + maximumLength + ' characters in length.'
    }

    if (stringToCheck.length < minimumLength) {
        return field + ' cannot be less than ' + minimumLength + ' characters in length.'
    }

    if (stringToCheck === null) {
        return field + ' cannot equal null'
    }

    if (stringToCheck === "") {
        return field + ' cannot be a blank space'
    }


    if (!isNaN(stringToCheck)) {
        return field + ' cannot be a number ( ' + stringToCheck + ' )'
    }

    /*
    No SQL Injection can occur when a user is allowed to pass a $ to a string. 
    This method ensures all string inputs are validated so that $ are replaced. 
    */

    if(stringToCheck.indexOf('$') >- 1) {
        return field + ' cannot contain $ this is a prohibited character'
    }

    /*
    Optional values depending on what user passes. 
    */

    if (isAlpha) {
        if (!alphaValidation(stringToCheck)) {
            return field + ' can only contain alphabetical characters'
        }
    }

    if (isAlphaNumeric) {
        if (!alphaNumericValidation(stringToCheck)) {
            return field + ' can only contain alphabetical and number characters'
        }
    }

    if (isAlphaWithSpaces) {
        if (!alphaWithSpaceValidation(stringToCheck)) {
            return field + ' can only contain alphabetical and white space characters'
        }
    }
}

function checkParameters(field, minLength, maxLength, isAlpabetical, isAlphaNumeric, isAlphaWithSpaces) {

    if (typeof field !== 'string') {
        throw TypeError
    }

    if (typeof minLength !== 'number') {
        throw TypeError
    }

    if (typeof maxLength !== 'number') {
        throw TypeError
    }

    if (typeof isAlpabetical !== 'boolean') {
        throw TypeError
    }

    if (typeof isAlphaNumeric !== 'boolean') {
        throw TypeError
    }

    if (typeof isAlphaWithSpaces !== 'boolean') {
        throw TypeError
    }

}