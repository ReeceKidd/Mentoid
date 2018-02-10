module.exports = function checkBasicRegistrationFields(req) {
    for (property in req.body) {
        if (property !== '_id' && 
            property !== 'facebook' &&
            property !== 'instagram' &&
            property !== 'twitter' && 
            property !== 'snapchat' && 
            property !== 'linkedIn' &&
            property !== 'medium' && 
            property !== 'website' && 
            property !== 'youtube') {
            return 'Request contained unsupported field: ' + property
        }
    }
}