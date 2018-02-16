module.exports = function socialMediaSanitization(body) {

    /*
    The undefined check before sanitization is required as 
    each of the social media fields are optional.
    */

    if (body.facebook !== undefined) {
        body.facebook = body.facebook.trim()
        body.facebook = escape(body.facebook)
    }

    if (body.instagram !== undefined) {
        body.instagram = body.instagram.trim()
        body.instagram = escape(body.instagram)
    }

    if (body.twitter !== undefined) {
        body.twitter = body.twitter.trim()
        body.twitter = escape(body.twitter)
    }

    if (body.snapchat !== undefined) {
        body.snapchat = body.snapchat.trim()
        body.snapchat = escape(body.snapchat)
    }

    if (body.linkedIn !== undefined) {
        body.linkedIn = body.linkedIn.trim()
        body.linkedIn = escape(body.linkedIn)
    }

    if (body.medium !== undefined) {
        body.medium = escape(body.medium)
        body.medium = body.medium.trim()
    }

    if (body.youtube !== undefined) {
        body.youtube = escape(body.youtube)
        body.youtube = body.youtube.trim()
    }

    if (body.website !== undefined) {
        body.website = escape(body.website)
        body.website = body.website.trim()
    }

}