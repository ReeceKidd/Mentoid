

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

function createUser() {
    /* Username must be returned in order to get Object ID */
    var userName = registerBasicUser().then(function (userName) {
        var userID = getUserID(userName).then(function(userID){
            var age = getUsersAge(userID).then(function(age){
                updateAreasOfInterest(userID, age).then(function(areasOfInterest){
                    console.log('Areas of interest updated for: ' + userName);
                })
                updateEducation(userID, age).then(function(education){
                    console.log('Education updated for: ' + userName)
                })
                updateJobHistory(userID, age).then(function(experiences){
                    console.log('Job history updated for: ' + userName)
                })
                updateSocialMedia(userID, userName).then(function(socialMedia){
                    console.log('Updated social media for ' + userName)
                })
                updateLocation(userID).then(function (location){
                    console.log('Updated location information for ' + userName)
                })
                getAreasOfInterest(userID).then(function(areasOfInterest){
                    updateMentorPreferences(userID, age, areasOfInterest).then(function(mentorPreferences){
                        console.log('Mentor preferences updated for ' + userName)
                    })
                    updateMenteePreferences(userID, age, areasOfInterest).then(function(menteePreferences){
                        console.log('Mentee preferences updated for ' + userName)
                    })
                })
            })
           
        })
    })  
    
}

createUser()
    