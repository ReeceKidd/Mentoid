module.exports = function checkObject (objectToCheck) {

    if (objectToCheck === undefined) {
        throw new Error(objectToCheck + ' is not defined')
    }
    
    if (typeof objectToCheck !== 'object') {
        throw new Error(objectToCheck + ' must be an object')
    }

}