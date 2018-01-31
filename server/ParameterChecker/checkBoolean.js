module.exports = function checkForBoolean(booleanToCheck) {

    if (booleanToCheck === undefined) {
        throw new Error(booleanToCheck + ' is not defined')
    }

    if (typeof booleanToCheck !== 'boolean') {
        throw new Error(booleanToCheck + ' must be a boolean')
    }

}