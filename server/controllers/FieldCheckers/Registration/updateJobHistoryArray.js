module.exports = function checkUpdateJobHistoryExperiencesArrayFields(experiences) {
    for (var index in experiences) {
        for (var property in experiences[index]) {
                if (property !== 'experienceID' &&
                    property !== 'title' &&
                    property !== 'company' &&
                    property !== 'startYear' &&
                    property !== 'endYear' &&
                    property !== 'isWorkingHere' &&
                    property !== '_id') {
                    return 'Request contained unsupported field: ' + property
                }
            }
        }
    }