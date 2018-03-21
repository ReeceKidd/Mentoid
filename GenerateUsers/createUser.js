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
        console.log('Username: ' + userName)
        let userID = getUserID(userName).then(function(userID){
            //console.log('userID: ' + userID)
            let age = getUsersAge(userID).then(function(age){
                //console.log('User age:' + age)
                let areasOfInterest = updateAreasOfInterest(userID, age).then(function(areasOfInterest){
                  updateMentorSettings(userName, userID, age, areasOfInterest).then(function(mentorSettings){
                    //console.log('Mentor settings: ' + JSON.stringify(mentorSettings, null, 2))
                  })
                  
                  updateMenteeSettings(userName, userID, age, areasOfInterest).then(function(menteeSettings){
                      //console.log('Mentee settings: ' + JSON.stringify(menteeSettings, null, 2))
                  })
                })
                updateEducation(userID, age).then(function(education){
                    //console.log('Education: ' + JSON.stringify(education, null, 2))
                })
                updateJobHistory(userID, age).then(function(jobHistory){
                    //console.log('Job HIstory: ' + JSON.stringify(jobHistory, null, 2))
                })
                updateSocialMedia(userID, userName).then(function(socialMedia){
                    //console.log('Social Media: ' + JSON.stringify(socialMedia, null, 2))
                })
                updateLocation(userID).then(function(location){
                    //console.log('Location: ' + JSON.stringify(location, null, 2))
                })
                updateProfilePicture(userID).then(function(profilePicture){
                    //console.log('Profile picture: ' + JSON.stringify(profilePicture, null, 2))
                })
                updateHasProfilePicture(userID).then(function(hasProfilePicture){
                    //console.log('Has profile picture: ' + JSON.stringify(hasProfilePicture, null, 2))
                })
            })
        }) 
    }) 
    
}

createUser()
