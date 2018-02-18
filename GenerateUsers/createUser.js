

const registerBasicUser = require('./basicRegistration.js')
const getUserID = require('./getUserID.js')
const getUsersAge = require('./getUsersAge.js')
const getAreasOfInterest = require('./getAreasOfInterest.js')
const updateAreasOfInterest = require('./areasOfInterest.js')
const updateEducation = require('./education.js')
const updateJobHistory = require('./jobHistory.js')
const updateMentorPreferences = require('./mentorPreferences.js')
const updateMenteePreferences = require('./menteePreferences')
const updateSocialMedia = require('./socialMedia.js')
const updateLocation = require('./location.js')
const updateProfilePicture = require('./uploadProfilePicture')

function createUser() {
    /* Username must be returned in order to get Object ID */
    var userName = registerBasicUser().then(function (userName) {
        var userID = getUserID(userName).then(function(userID){
            var age = getUsersAge(userID).then(function(age){
                updateAreasOfInterest(userID, age)
                updateEducation(userID, age)
                updateJobHistory(userID, age)
                updateSocialMedia(userID, userName)
                updateLocation(userID)
                updateProfilePicture(userID)
                getAreasOfInterest(userID).then(function(areasOfInterest){
                    updateMentorPreferences(userID, age, areasOfInterest)
                    updateMenteePreferences(userID, age, areasOfInterest)
                })
            })
        })
        console.log('User created: ' + userName)
    })  
    
}

createUser()
    