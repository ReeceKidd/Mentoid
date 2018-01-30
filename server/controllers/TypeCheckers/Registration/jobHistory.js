module.exports = function checkJobHistory(req){
    
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

    if(!req.age instanceof String) {
        return 'Age must be a string.'
    }
}