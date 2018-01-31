module.exports = function checkForNumber(numberToCheck){
    if (numberToCheck === undefined) {
        throw new Error(numberToCheck + ' is not defined')
    }

    if (typeof numberToCheck !== 'number') {
        throw new Error(numberToCheck + ' must be a number')
    }
}