/*
This is used to check the parameters for my code. Where multiple
parameters are past particularly in test generation, validating and 
sanitizing the input. 
*/

const checkParameterType = {}

checkParameterType.checkForString = function (stringToCheck) {

    if (stringToCheck === undefined) {
        throw new Error(stringToCheck + ' is not defined.')
    }

    if (typeof stringToCheck !== 'string') {
        throw new Error(stringToCheck + ' must be a string')
    }

}

checkParameterType.checkForNumber = function (numberToCheck) {

    if (numberToCheck === undefined) {
        throw new Error(numberToCheck + ' is not defined')
    }

    if (typeof numberToCheck !== 'number') {
        throw new Error(numberToCheck + ' must be a number')
    }

}

checkParameterType.checkForBoolean = function (booleanToCheck) {

    if (booleanToCheck === undefined) {
        throw new Error(booleanToCheck + ' is not defined')
    }

    if (typeof booleanToCheck !== 'boolean') {
        throw new Error(booleanToCheck + ' must be a boolean')
    }

}

checkParameterType.checkForArray = function (arrayToCheck) {

    if (arrayToCheck === undefined) {
        throw new Error(arrayToCheck + ' is not defined')
    }

    if (!Array.isArray(arrayToCheck)) {
        throw new Error(arrayToCheck + ' must be an array')
    }

}

checkParameterType.checkForObject = function (objectToCheck) {

    if (objectToCheck === undefined) {
        throw new Error(functionToCheck + ' is not defined')
    }
    
    if (typeof objectToCheck !== 'object') {
        throw new Error(objectToCheck + ' must be an object')
    }

}

checkParameterType.checkForFunction = function (functionToCheck) {

    if (functionToCheck === undefined) {
        throw new Error(functionToCheck + ' is not defined')
    }

    if (typeof functionToCheck !== 'function') {
        throw new Error(arrayToCheck + ' must be a function')
    }

}

module.exports = checkParameterType