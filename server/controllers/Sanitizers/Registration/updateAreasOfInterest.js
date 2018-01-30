const preventNoSQLInjection = require('../preventNoSQLInjection')

module.exports = function updateAreasOfInterestSanitization(body){

    body._id = escape(body._id)
    body._id = body._id.trim()
    body._id = preventNoSQLInjection(body._id)

    body.age = escape(body._id)
    body.age = body.age.trim()
    body.age = preventNoSQLInjection(body.age)

    for(var currentIndex in body.areasOfInterest){

        var currentAreaOfInterest = body.areasOfInterest[currentIndex]
        var value = currentAreaOfInterest.value
        var years = currentAreaOfInterest.years
        var areaOfInterestID = currentAreaOfInterest.areaOfInterestID

        value = escape(value)
        value = value.trim()
        value = preventNoSQLInjection(value)

        years = escape(years)
        years = years.trim()
        years = preventNoSQLInjection(years)

        areaOfInterestID = escape(areaOfInterestID)
        areaOfInterestID = areaOfInterestID.trim()
        areasOfInterestID = preventNoSQLInjection(areaOfInterestID)
    }
    
}