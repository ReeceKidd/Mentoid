module.exports = function updateJobHistoryExperiencesArray(experiences) {
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