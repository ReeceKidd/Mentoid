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

const alphaNumericValidation = require('../CustomValidators/alphaNumeric')

module.exports = function validateNumber(field, numberToCheck, minimumValue, maximumValue) {

    checkParameters(field, minimumValue, maximumValue)

}

function checkParameters(field, minimumValue, maximumValue) {

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