module.exports = function checkEducation(req){
    
    if(!req.education instanceof Array){
        return 'Experiences must be an array'
    }

    for (var x = 0; x < req.education.length; x++) {
        
        var currentEducation = req.education[x]
        var values = Object.values(currentEducation)
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