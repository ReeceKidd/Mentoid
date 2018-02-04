const isValidMongoObjectID = require('../../CustomValidators/isValidMongoObjectID')
const date = new Date()
const currentYear = date.getFullYear()

function validYear(year) {
    if (year.length !== 4) {
        return false
    }
    if (!year.match(/\d{4}/)) {
        return false
    }
    return true
}

function greaterThanCurrentYear(year) {
    if (year > currentYear) return false
    return true
}

module.exports = function updateJobHistoryValidation(req) {

    // User ID validation

    /*
    1) Checks that the user ID exists in the request. 
    2) Checks that the user ID is equal to a string. 
    3) Checks that the userID is not an empty string.
    4) Checks that userID is equal to a valid MongoDB object.  
    */

    req.check('_id', 'ID object should be a valid ObjectID ').custom((value) => isValidMongoObjectID(value))
    req.check('_id', 'User ID must be sent with request').exists()
    req.check('_id', 'UserID must be a string').custom(_id => {
        if (typeof _id !== 'string') {
            return false
        }
        return true
    })
    req.check('_id', 'UserID can not be an empty string').custom(_id => {
        if (_id == '""') {
            return false
        }
        return true
    })

    //User Age validation
    /*
    1) Checks that age is a number. 
    2) Checks that age exists
    3) Checks that age is in valid number range.
    */
    req.check('age', 'User age must be sent with request').exists()
    req.check('age', 'Age must be a valid number between 16 and 120').custom(age => {
        if (age < 16) {
            return false
        } else if (age > 120) {
            return false
        } else {
            return true
        }
    })

    const userAge = req.body.age

    //Experiences title field checks.
    req.check('experiences', 'Each experience title must be defined').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].title === 'undefined') {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'experience titles can only contain letters and white space').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            if (typeof experiences[x].title !== 'string') {
                return false
            }
            var match = experiences[x].title.match(/^[A-Za-z\s]+$/)
            if (match === undefined) {
                return false
            }
            if (!match) {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Experience titles must be at least two characters long').custom(experiences => {

        for (var x = 0; x < experiences.length; x++) {
            console.log(experiences[x].title.length)
            if (experiences[x].title.length < 2) {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Experience titles cannot be greater than 100 characters').custom(experiences => {

        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].title.length > 100) {
                return false
            }
        }
        return true
    })

    //Company field checks 
    req.check('experiences', 'Each experience company must be defined').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].value === 'undefined') {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Experience companies can only contain letters, numbers and white space').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            var match = experiences[x].company.match(/^[a-z\d\-_\s]+$/i)
            if (match === undefined) {
                return false
            }
            if (!match) {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Experience companys must be at least two characters long').custom(experiences => {

        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].company.length < 2) {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Experience company cannot be greater than 100 characters').custom(experiences => {

        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].company.length > 100) {
                return false
            }
        }
        return true
    })

    // Start Year
    req.check('experiences', 'Each start year must be defined').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].startYear === 'undefined') {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Start year must be in the following format: YYYY').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            if (!validYear(experiences[x].startYear)) {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Start year cannot be greater than current year: ' + currentYear).custom(experiences => {

        for (var x = 0; x < experiences.length; x++) {
            if (!greaterThanCurrentYear(experiences[x].startYear)) {
                return false
            }
        }
        return true
    })
    //Checks that the start year is not before the user was born. 
    req.check('experiences', 'Start year cannot be before your year of birth.').custom(experiences => {
        var usersYearOfBirth = currentYear - req.body.age

        for (var x = 0; x < experiences.length; x++) {
            if (experiences.startYear < usersYearOfBirth) {
                return false
            }
        }
        return true
    })

    //isWorkingHere
    req.check('experiences', 'isWorkingHere must be defined').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].isWorkingHere === 'undefined') {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'isWorking here is a boolean value').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            if (!experiences[x].isWorkingHere === 'true' || !experiences[x].isWorkingHere === 'false') {
                return false
            }
        }
        return true
    })


    //End Year
    //Only validate end year if the user is no longer working there. 
    for (var y = 0; y < req.body.experiences.length; y++) {

        if (req.body.experiences[y].isWorkingHere === 'No') {

            req.check('experiences', 'End year must be in the following format: YYYY').custom(experiences => {

                for(var w = 0; w < experiences.length; w++){
                    if (!validYear(experiences[w].endYear)) {
                        return false
                    }
                }
                
                return true
            })

            req.check('experiences', 'End year cannot be greater than current year: ' + currentYear).custom(experiences => {

                for(var w = 0; w < experiences.length; w++){
                    if (!greaterThanCurrentYear(experiences[w].endYear)) {
                        return false
                    }
                }
                
                return true
            })
            req.check('experiences', 'End year cannot be before the starting year').custom(experiences => {

                for(var w = 0; w < experiences.length; w++){
                    console.log(experiences[w])
                    if (experiences[w].endYear < experiences[w].startYear) {
                        return false
                    }
                }
                
                return true
            })

            //Checks that the total working time is possible given the users age. 
            req.check('experiences', 'It is not possible that you worked here for this long as you are ' + userAge + ' years old').custom(experiences => {

                
                for(var w = 0; w < experiences.length; w++){
                    var totalWorkingTime = experiences[w].endYear - experiences[w].startYear

                if (totalWorkingTime > req.body.age) {
                    return false
                }
                }
                
                return true

            })

        }

    }

    var errors = req.validationErrors(true)

    if (errors) {
        return errors[Object.keys(errors)[0]].msg
    }
}