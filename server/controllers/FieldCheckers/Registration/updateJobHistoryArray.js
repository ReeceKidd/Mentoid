module.exports = function checkUpdateJobHistoryExperiencesArrayFields(experiences) {
    for (var currentExperience in experiences) {
        for (var property in currentExperience) {
            if (currentExperience.hasOwnProperty(property)) {
                if (property !== 'title' &&
                    property !== 'company' &&
                    property !== 'experienceID' &&
                    property !== 'startDate' &&
                    property !== 'endDate' &&
                    property !== 'isWorkingHere') {
                    return 'Request contained unsupported field: ' + property
                }
            }
        }
    }
}