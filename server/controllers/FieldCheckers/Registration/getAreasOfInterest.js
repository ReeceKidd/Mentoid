module.exports = function checkEmail(req) {
    for (property in req.params) {
        if (property !== '_id') {
            return 'Request contained unsupported field: ' + property
        }
    }
}