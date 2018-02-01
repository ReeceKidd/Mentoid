module.exports = function checkAreasOfInterest(req) {
    for (property in req.params) {
        if (property !== 'userID') {
            return 'Request contained unsupported field: ' + property
        }
    }
}