

const registerBasicUser = require('./basicRegistration.js')
const getUserID = require('./getUserID.js')
const getUsersAge = require('./getUsersAge.js')
const getAreasOfInterest = require('./getAreasOfInterest.js')
const updateAreasOfInterest = require('./areasOfInterest.js')
const updateEducation = require('./education.js')
const updateJobHistory = require('./jobHistory.js')
const updateMentorPreferences = require('./mentorPreferences.js')

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
                getAreasOfInterest(userID).then(function(areasOfInterest){
                    updateMentorPreferences(userID, age, areasOfInterest).then(function(mentorPreferences){
                        console.log('Mentor preferences updated for ' + userName)
                    })
                })
            })
        })
    })
   
    
   
    
    
}

createUser()