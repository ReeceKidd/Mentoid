const axios = require('axios')
const updateSocialMediaURL = 'http://localhost:4000/update/social-media'

var facebook = getFaceBook()
var instagram = getInstagram()
var twitter = getTwitter()
var snapchat = getSnapchat()
var linkedIn = getLinkedIn()
var medium = getMedium()
var youtube = getYoutube()
var website = getWebsite()
const maximumNumberOfSocialMediaAccounts = 8

/* Register Basic User */
module.exports = async function generateSocialMedia(userID, userName) {
    var socialMediaAccounts = generateSocialMediaObject(userName)
    await axios.post(updateSocialMediaURL, {
        facebook: socialMediaAccounts.facebook,
        instagram: socialMediaAccounts.instagram,
        twitter: socialMediaAccounts.twitter,
        snapchat: socialMediaAccounts.snapchat,
        linkedIn: socialMediaAccounts.linkedIn,
        medium: socialMediaAccounts.medium,
        youtube: socialMediaAccounts.youtube,
        website: socialMediaAccounts.website,
        userID: userID
    }).catch(error => {
        console.log('Could not update Social media account: ' + error.message)
    })
    return userName
}

//I will generate values for each shuffle the array and return a random number of result 
function getRandomNumberOfSocialMediaAccounts() {
    return Math.floor(Math.random() * (maximumNumberOfSocialMediaAccounts + 1) + 1);
}

function generateSocialMediaObject(userName) {
    var numberOfAccountsToGenerate = getRandomNumberOfSocialMediaAccounts()
    var socialMediaObject = {
        "facebook": getFaceBook(userName),
        "instagram": getInstagram(userName),
        "twitter": getTwitter(userName),
        "snapchat": getSnapchat(userName),
        "linkedIn": getLinkedIn(userName),
        "medium": getMedium(userName),
        "youtube": getYoutube(userName),
        "website": getWebsite(userName)
    }
    var randomSocialAccounts = {}
    for (var propName in socialMediaObject) {
        propValue = socialMediaObject[propName]
        randomSocialAccounts[propName] = propValue
        if (Object.keys(randomSocialAccounts).length === numberOfAccountsToGenerate) {
            return randomSocialAccounts
        }
    }
    return randomSocialAccounts
}

function getFaceBook(userName) {
    return 'www.facebook.com/' + userName
}

function getInstagram(userName) {
    return userName
}

function getTwitter(userName) {
    return userName
}

function getSnapchat(userName) {
    return userName
}

function getLinkedIn(userName) {
    return 'www.linkedin.com/' + userName
}

function getMedium(userName) {
    return 'www.medium.com/' + userName
}

function getYoutube(userName) {
    return 'www.youtube.com/' + userName
}

function getWebsite(userName) {
    return 'www.' + userName + '.com'
}