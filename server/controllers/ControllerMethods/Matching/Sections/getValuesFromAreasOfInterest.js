module.exports = function getValuesFromAreasOfInterest(areasOfInterest){
    var valuesFromAreasOfInterest = []
    for (var x = 0; x < areasOfInterest.length; x++) {
        var currentAreaOfInterest = areasOfInterest[x]
        valuesFromAreasOfInterest.push(currentAreaOfInterest.value)
    }
    return valuesFromAreasOfInterest
}