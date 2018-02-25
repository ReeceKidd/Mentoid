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
    let userName = registerBasicUser().then(function (userName) {
        let userID = getUserID(userName).then(function(userID){
            let age = getUsersAge(userID).then(function(age){
                let areasOfInterest = updateAreasOfInterest(userID, age).then(function(areasOfInterest){
                    updateMentorSettings(userName, userID, age, areasOfInterest)
                    updateMenteeSettings(userName, userID, age, areasOfInterest)
                })
                updateEducation(userID, age)
                updateJobHistory(userID, age)
                updateSocialMedia(userID, userName)
                updateLocation(userID)
                updateProfilePicture(userID)
                updateHasProfilePicture(userID)
            })
        })
        console.log('User created: ' + userName)
    })  
    
}

createUser()
