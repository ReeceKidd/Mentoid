module.exports = function checkEmail(req) {
    for (property in req.params) {
        if (property !== 'email') {
            return 'Request contained unsupported field: ' + property
        }
    }
}