

const registerBasicUser = require('./basicRegistration.js')
const getUserID = require('./getUserID.js')
const getUsersAge = require('./getUsersAge.js')
const updateAreasOfInterest = require('./areasOfInterest.js')
const updateEducation = require('./education.js')
const updateJobHistory = require('./jobHistory.js')

function createUser() {
    /* Username must be returned in order to get Object ID */
    var userName = registerBasicUser().then(function (userName) {
        var userID = getUserID(userName).then(function(userID){
            var age = getUsersAge(userID).then(function(age){
                var areasOfInterest = updateAreasOfInterest(userID, age).then(function(areasOfInterest){
                    console.log('Areas of interest updated for: ' + userName);
                })
                var education = updateEducation(userID, age).then(function(education){
                    console.log('Education updated for: ' + userName)
                })
            })
        })
    })
   
    
   
    
    
}

createUser()