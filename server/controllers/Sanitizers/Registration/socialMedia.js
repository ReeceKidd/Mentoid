module.exports = function socialMediaSanitization(body){

    body.facebook = body.facebook.trim()
    body.facebook = escape(body.facebook)

    body.instagram = body.instagram.trim()
    body.instagram = escape(body.instagram)

    body.twitter = body.twitter.trim()
    body.twitter = escape(body.twitter)

    body.snapchat = body.snapchat.trim()
    body.snapchat = escape(body.snapchat)

    body.linkedIn = body.linkedIn.trim()
    body.linkedIn = escape(body.linkedIn)

    body.medium = escape(body.medium)
    body.medium = body.medium.trim()

    body.youtube = escape(body.youtube)
    body.youtube = body.youtube.trim()

    body.website = escape(body.website)
    body.website = body.website.trim()
}