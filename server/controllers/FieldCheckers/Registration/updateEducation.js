module.exports = function updateEducation(req) {
    for (property in req) {
        if (property !== '_id' && 
            property !== 'age' &&
            property !== 'education') {
            return 'Request contained unsupported field: ' + property
        }
    }
}