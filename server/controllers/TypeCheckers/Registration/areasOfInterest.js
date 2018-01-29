module.exports = function checkAreasOfInterest(req){
    
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