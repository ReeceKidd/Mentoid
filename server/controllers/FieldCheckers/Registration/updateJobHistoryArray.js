module.exports = function checkUpdateJobHistoryExperiencesArrayFields(experiences) {
    for (var index in experiences) {
        for (var property in experiences[index]) {
                if (property !== 'title' &&
                    property !== 'company' &&
                    property !== 'startDate' &&
                    property !== 'endDate' &&
                    property !== 'isWorkingHere') {
                    return 'Request contained unsupported field: ' + property
                }
            }
        }
    }