const isValidMongoObjectID = require('../../CustomValidators/isValidMongoObjectID')
const date = new Date()
const currentYear = date.getFullYear()

function validYear(year) {
    if (year.length !== 4) return false
    if (!year.match(/\d{4}/)) return false
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

    req.check('_id', 'ID object should be a valid ObjectID ').custom((school) => isValidMongoObjectID(school))
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



    //Experiences degree field checks.
    req.check('education', 'Each experience degree must be defined').custom(education => {
        for (var x = 0; x < education.length; x++) {
            if (education[x].school === 'undefined') {
                return false
            }
        }
        return true
    })
    req.check('education', 'experience degrees can only contain letters and white space').custom(education => {
        for (var x = 0; x < education.length; x++) {
            if (typeof education[x].degree !== 'string') {
                return false
            }
            var match = education[x].degree.match(/^[A-Za-z\s]+$/)
            if (match === undefined) {
                return false
            }
            if (!match) {
                return false
            }
        }
        return true
    })
    req.check('education', 'Education degrees must be at least two characters long').custom(education => {

        for (var x = 0; x < education.length; x++) {
            if (education[x].degree.length < 2) {
                return false
            }
        }
        return true
    })
    req.check('education', 'Education degrees cannot be greater than 100 characters').custom(education => {

        for (var x = 0; x < education.length; x++) {
            if (education[x].degree.length > 100) {
                return false
            }
        }
        return true
    })

    //Company field checks 
    req.check('education', 'Each school must be defined').custom(education => {
        for (var x = 0; x < education.length; x++) {
            if (education[x].school === 'undefined') {
                return false
            }
        }
        return true
    })
    /*
    Due to the fact that some schools contain special accents, hypens and language based characters there is no 
    check for alpha and whitespace.
    */
    req.check('education', 'Education schools must be at least two characters long').custom(education => {

        for (var x = 0; x < education.length; x++) {
            if (education[x].school.length < 2) {
                return false
            }
        }
        return true
    })
    req.check('education', 'Education schools cannot be greater than 100 characters').custom(education => {

        for (var x = 0; x < education.length; x++) {
            if (education[x].school.length > 100) {
                return false
            }
        }
        return true
    })

    //Field of study
     req.check('education', 'Each field of study must be defined').custom(education => {
        for (var x = 0; x < education.length; x++) {
            if (education[x].fieldOfStudy === 'undefined') {
                return false
            }
        }
        return true
    })
    req.check('education', 'Education field of study can only contain letters, numbers and white space').custom(education => {
        for (var x = 0; x < education.length; x++) {
            var match = education[x].fieldOfStudy.match(/^[a-z\d\-_\s]+$/i)
            if (match === undefined) {
                return false
            }
            if (!match) {
                return false
            }
        }
        return true
    })
    req.check('education', 'Education schools must be at least two characters long').custom(education => {

        for (var x = 0; x < education.length; x++) {
            if (education[x].fieldOfStudy.length < 2) {
                return false
            }
        }
        return true
    })
    req.check('education', 'Education degrees cannot be greater than 100 characters').custom(education => {

        for (var x = 0; x < education.length; x++) {
            if (education[x].fieldOfStudy.length > 100) {
                return false
            }
        }
        return true
    })

    // Start Year
    req.check('education', 'Each start year must be defined').custom(education => {
        for (var x = 0; x < education.length; x++) {
            if (education[x].startYear === 'undefined') {
                return false
            }
        }
        return true
    })
    req.check('education', 'Start year must be in the following format: YYYY').custom(education => {
        for (var x = 0; x < education.length; x++) {
            validYear(parseInt(education[x].startYear))
        }
        return true
    })
    req.check('education', 'Start year cannot be greater than current year: ' + currentYear).custom(education => {

        for (var x = 0; x < education.length; x++) {
            greaterThanCurrentYear(parseInt(education[x.startYear]))
        }
        return true
    })
    //Checks that the start year is not before the user was born. 
    req.check('education', 'Start year cannot be before your year of birth.').custom(education => {
        var usersYearOfBirth = currentYear - req.body.age

        for(var x = 0; x < education.length; x++){
            if(education.startYear < usersYearOfBirth){
                return false
            }
        }
        return true
    })

    //End Year
    //Only validate end year if the user is no longer working there. 
    if (req.body.isWorkingHere === false) {

        req.check('education', 'Each end year must be defined').custom(education => {
            for (var x = 0; x < education.length; x++) {
                if (education[x].endYear === 'undefined') {
                    return false
                }
            }
            return true
        })
        req.check('education', 'End year must be in the following format: YYYY').custom(education => {
            for (var x = 0; x < education.length; x++) {
                validYear(parseInt(education[x].endYear))
            }
            return true
        })
        req.check('education', 'End year must be the same or greater than the starting year').custom(education => {

            for (var x = 0; x < education.length; x++) {
                if (parseInt(education[x].startYear) > parseInt(education[x].endYear)) {
                    return false
                }
            }
            return true
        })

    }

    //Checks that the total working time is possible given the users age. 
    req.check('education', 'Number of years is viable given the users age').custom(education => {

        for (var x = 0; x < education.length; x++) {
            //If the user is NOT still working there. 
            if (!req.body.isWorkingHere) {
                var totalTime = education[x].endYear - education[x].startYear

                if (totalTime > req.body.age) {
                    return false
                }

            }
        }
        return true

    })


    var errors = req.validationErrors(true)

    if (errors) {
        return errors[Object.keys(errors)[0]].msg
    }
}




//Start Date Field

/*
Check that the start date is not greater than the users age. 
Check that the start date is not greater than the end date. 
Do the basic checks on anything else. 
*/

//End date field

/*
Checks the experience ID field is defined. 
Checks the experience ID field is an integer. 
*/