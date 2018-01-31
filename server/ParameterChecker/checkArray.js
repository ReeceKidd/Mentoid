module.exports = function checkArray(arrayToCheck) {

    if (arrayToCheck === undefined) {
        throw new Error(arrayToCheck + ' is not defined')
    }

    if (!Array.isArray(arrayToCheck)) {
        throw new Error(arrayToCheck + ' must be an array')
    }

}