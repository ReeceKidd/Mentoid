module.exports = function checkForString(stringToCheck) {

    if (stringToCheck === undefined) {
        throw new Error(stringToCheck + ' is not defined.')
    }

    if (typeof stringToCheck !== 'string') {
        throw new Error(stringToCheck + ' must be a string')
    }

}