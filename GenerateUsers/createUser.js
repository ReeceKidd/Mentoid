let registerBasicUser = require('./basicRegistration.js')
let getUserID = require('./getUserID.js')
let getUsersAge = require('./getUsersAge.js')
let updateAreasOfInterest = require('./areasOfInterest.js')
let updateEducation = require('./education.js')
let updateJobHistory = require('./jobHistory.js')
let updateMentorSettings = require('./mentorSettings.js')
let updateMenteeSettings = require('./menteeSettings.js')
let updateSocialMedia = require('./socialMedia.js')
let updateLocation = require('./location.js')
let updateProfilePicture = require('./uploadProfilePicture')
let updateHasProfilePicture = require('./updateHasProfilePicture')

function createUser() {
    /* Username must be returned in order to get Object ID */
    let userName = registerBasicUser().then(userName => {
        let userID = getUserID(userName).then(userID => {
            let age = getUsersAge(userName, userID).then(age => {
                var areasOfInterest = updateAreasOfInterest(userName, userID, age).then(areasOfInterest => {
                    updateMentorSettings(userName, userID, age, areasOfInterest)
                    updateMenteeSettings(userName, userID, age, areasOfInterest)
                }).catch(getUsersAgeError => {
                    throw getUsersAgeError
                })
                updateEducation(userName, userID, age).catch(educationError => {
                    throw educationError
                })
                updateJobHistory(userName, userID, age).catch(jobHistoryError => {
                    throw jobHistoryError
                })
                updateSocialMedia(userName, userID).catch(socialMediaError => {
                   throw socialMediaError
                })
                updateLocation(userName, userID).catch(locationError => {
                    throw locationError
                })
                updateProfilePicture(userID).catch(profilePictureError => {
                    throw profilePictureError
                })
                updateHasProfilePicture(userID)
            })
        }).catch(idError => {
            throw idError
        })
    }).catch(error => {
        throw userNameError
    })
    return userName
}

function generateUser() {
    var result = createUser().then(userName => {
        console.log(userName)
    })
}

generateUser()
