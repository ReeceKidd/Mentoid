const checkFields = {}

/*
Checks that the basic registration request only has: firstName, lastName, userName, email, password, 
confirmPasword, age, country, terms, areasOfInterest, 
areasOfInterestRegistrationComplete, userRegistrationComplete  
*/

checkFields.basicRegistration = function (req) {
    for (property in req.body) {
        if (property !== 'firstName' && property !== 'lastName' &&
            property !== 'userName' && property !== 'email' && property !== 'password' &&
            property !== 'age' && property !== 'confirmPassword' && property !== 'language' &&
            property !== 'terms' && property) {
            return 'Request contained unsupported field: ' + property
        }
    }
}

//Checks that the update areas of interest request has only to properties an '_id' and 'areas of interest. 
checkFields.updateAreasOfInterest = function (req) {
    for (property in req) {
        if (property !== '_id' && property !== 'areasOfInterest' && property !== 'age') {
            return 'Request contained unsupported field: ' + property
        }
    }
}

//Checks that the areas of interest request has the properties value, years, and areaOfInterestID.
checkFields.updateAreasOfInterestArray = function (areasOfInterest) {
    for (var x = 0; x < areasOfInterest.length; x++) {
        var currentAreaOfInterest = areasOfInterest[x]
        for (var key in currentAreaOfInterest) {
            if (currentAreaOfInterest.hasOwnProperty(key)) {
                if (key !== 'value' &&
                    key !== 'years' &&
                    key !== 'areaOfInterestID') {
                    return 'Request contained unsupported field: ' + key
                }
            }
        }
    }

} 

//Checks that the update job history request only has the properties of 'experiences' and '_id'
checkFields.updateJobHistory = function (req) {
    for (property in req) {
        if (property !== '_id' && property !== 'experiences') {
            return 'Request contained unsupported field: ' + property
        }
    }
}

//Checks the experiences array of the update job history request has the properties of title, company, experienceID, startDate, endDate and isWorkingHere.
checkFields.updateJobHistoryExperiencesArray = function (experiences) {
    for (var x = 0; x < experiences.length; x++) {
        var currentExperience = experiences[x]
        for (var key in currentExperience) {
            if (currentExperience.hasOwnProperty(key)) {
                if (key !== 'title' &&
                    key !== 'company' &&
                    key !== 'experienceID' &&
                    key !== 'startDate' &&
                    key !== 'endDate' &&
                    key !== 'isWorkingHere') {
                    return 'Request contained unsupported field: ' + key
                }
            }
        }
    }
}





module.exports = checkFields