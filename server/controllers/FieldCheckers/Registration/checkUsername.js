module.exports = function checkUsername(req) {
    for (property in req.params) {
        if (property !== 'username') {
            return 'Request contained unsupported field: ' + property
        }
    }
}