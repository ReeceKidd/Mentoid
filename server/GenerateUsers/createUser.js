

const registerBasicUser = require('./basicRegistration.js')
const updateAreasOfInterest = require('./areasOfInterest.js')
const getUserID = require('./getUserID.js')
const getUsersAge = require('./getUsersAge.js')

function createUser() {
    /* Username must be returned in order to get Object ID */
    var userName = registerBasicUser().then(function (userName) {
        var userID = getUserID(userName).then(function(userID){
            var userAge = getUsersAge(userID).then(function(userAge){
                console.log(userAge);
            })
        })
    })
    /* Gets the userID from the userName */
    
   
    
    
}

createUser()