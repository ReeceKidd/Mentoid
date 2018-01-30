module.exports = function updateAreasOfInterestSanitization(body){

    body._id = escape(body._id)
    body._id = body._id.trim()

    body.age = escape(body._id)
    body.age = body.age.trim()

    for(var currentIndex in body.areasOfInterest){

        
        
        var currentAreaOfInterest = body.areasOfInterest[currentIndex]
        var value = currentAreaOfInterest.value
        var years = currentAreaOfInterest.years
        var areaOfInterestID = currentAreaOfInterest.areaOfInterestID

        value = escape(value)
        value = value.trim()

        years = escape(years)
        years = years.trim()

        areaOfInterestID = escape(areaOfInterestID)
        areaOfInterestID = areaOfInterestID.trim()
    }
    
}