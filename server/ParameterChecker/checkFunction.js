module.exports = function checkForFunction(functionToCheck) {

    if (functionToCheck === undefined) {
        throw new Error(functionToCheck + ' is not defined')
    }

    if (typeof functionToCheck !== 'function') {
        throw new Error(arrayToCheck + ' must be a function')
    }

}