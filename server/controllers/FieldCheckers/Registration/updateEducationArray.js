module.exports = function checkEducationArrayFields(education) {
    for (var index in education) {
        for (var property in education[index]) {
                if (property !== 'experienceID' &&
                    property !== 'title' &&
                    property !== 'company' &&
                    property !== 'startDate' &&
                    property !== 'endDate' &&
                    property !== 'isWorkingHere') {
                    return 'Request contained unsupported field: ' + property
                }
            }
        }
    }