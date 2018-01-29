module.exports = function checkUpdateAreasOfInterestArrayFields(areasOfInterest) {
    for (var currentAreaOfInterest in areasOfInterest) {
        for (var property in currentAreaOfInterest) {
            if (currentAreaOfInterest.hasOwnProperty(property)) {
                if (property !== 'value' &&
                    property !== 'years' &&
                    property !== 'areaOfInterestID') {
                    return 'Request contained unsupported field: ' + property
                }
            }
        }
    }

} 