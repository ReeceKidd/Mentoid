module.exports = function updateEducation(req) {
    for (property in req) {
        if (property !== '_id' && 
            property !== 'age' &&
            property !== 'experiences') {
            return 'Request contained unsupported field: ' + property
        }
    }
}