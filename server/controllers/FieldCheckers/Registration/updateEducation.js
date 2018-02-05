module.exports = function updateEducation(req) {
    console.log(req.body)
    for (property in req) {
        if (property !== '_id' && 
            property !== 'age' &&
            property !== 'education') {
            return 'Request contained unsupported field: ' + property
        }
    }
}