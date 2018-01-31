/*
This is used to check the parameters for my code. Where multiple
parameters are past particularly in test generation, validating and 
sanitizing the input. 
*/

const checkParameterType = {}

checkParameterType.checkForString = function(stringToCheck) {
    
    if (typeof field !== 'string') {
        throw new Error(stringToCheck + ' must be a string')
    }

}

checkParameterType.checkForNumber = function(numberToCheck) {
    
    if (typeof numberToCheck !== 'number') {
        throw new Error(numberToCheck + ' must be a number')
    }

}

checkParameterType.checkForBoolean = function(booleanToCheck) {
    
    if (typeof booleanToCheck !== 'boolean') {
        throw new Error(booleanToCheck + ' must be a boolean')
    }

}

checkParameterType.checkForArray = function(arrayToCheck) {
    
    if (!Array.isArray(arrayToCheck)) {
        throw new Error(arrayToCheck + ' must be an array')
    }

}

checkParameterType.checkForObject = function(objectToCheck) {
    
    
    if (typeof objectToCheck !== 'object') {
        throw new Error(objectToCheck + ' must be an object')
    }

}

checkParameterType.checkForFunction = function(functionToCheck) {
    
    if (typeof functionToCheck!== 'function') {
        throw new Error(arrayToCheck + ' must be a function')
    }

}

module.exports = checkParameterType