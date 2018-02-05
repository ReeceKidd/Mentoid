module.exports = function checkEducationArrayFields(education) {
    for (var index in education) {
        for (var property in education[index]) {
                if (property !== 'educationID' &&
                    property !== 'degree' &&
                    property !== 'school' &&
                    property !== 'fieldOfStudy' &&
                    property !== 'startYear' &&
                    property !== 'endYear') {
                    return 'Request contained unsupported field: ' + property
                }
            }
        }
    }