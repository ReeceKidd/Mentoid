module.exports = function checkUpdateAreasOfInterestFields(req) {
    for (property in req) {
        if (property !== '_id' && 
            property !== 'areasOfInterest' && 
            property !== 'age') {
            return 'Request contained unsupported field: ' + property
        }
    }
}