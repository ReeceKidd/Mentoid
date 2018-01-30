module.exports = function checkAreasOfInterestArray(areasOfInterest) {
    for (var index in areasOfInterest) {
        for (var property in areasOfInterest[index]) {
                if (property !== 'value' &&
                    property !== 'years' &&
                    property !== 'areaOfInterestID') {
                    return 'Request contained unsupported field: ' + property
                }
            }
        }
    }