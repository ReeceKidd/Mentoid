/*
Checks that values posted to different requests are strings, as strings are the only value that 
is accpeted by express validator. 
*/

const typeChecker = {}

typeChecker.checkBasicRegistration = function(req) {

}

// This checks that the areas of interest method contains the correct types 
typeChecker.checkAreasOfInterest = function(req){
    
    if(!req.areasOfInterest instanceof Array){
        return 'Areas of interest must be an Array'
    }

    for (var x = 0; x < req.areasOfInterest.length; x++) {
        
        var currentAreaOfInterest = req.areasOfInterest[x]
        var values = Object.values(currentAreaOfInterest)
        for(value in values){
            if(!value instanceof String){
                return value + ' must be a string'
            }
        }
    }

    if(!req.age instanceof String) {
        return 'Age must be a string.'
    }

    if(!req._id instanceof String) {
        return 'ID must be a string.'
    }
}

// This checks that the update job history method requests contains an experiences array, containing only strings and an ID value. 
typeChecker.checkJobHistory = function(req){
    
    if(!req.experiences instanceof Array){
        return 'Experiences must be an array'
    }

    for (var x = 0; x < req.experiences.length; x++) {
        
        var currentExperience = req.experiences[x]
        var values = Object.values(currentExperience)
        for(value in values){
            if(!value instanceof String){
                return value + ' must be a string.'
            }
        }
    }

    if(!req._id instanceof String) {
        return 'ID must be a string.'
    }
}

module.exports = typeChecker