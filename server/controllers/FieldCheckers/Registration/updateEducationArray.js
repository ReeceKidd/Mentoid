module.exports = function checkEducationArrayFields(education) {
    for (var index in education) {
        for (var property in education[index]) {
            console.log(property)
                if (property !== 'educationID' &&
                    property !== 'degree' &&
                    property !== 'school' &&
                    property !== 'fieldOfStudy' &&
                    property !== 'startYear' &&
                    property !== 'endYear' &&
                    property !== '_id') {
                    return 'Request contained unsupported field: ' + property
                }
            }
        }
    }