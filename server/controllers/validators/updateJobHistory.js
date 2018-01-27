module.exports = function updateJobHistoryValidation(req) {

    //Current Year is needed for startDate and endDate methods. 
    const now = new Date
    const theYear=now.getYear() + 1900

    // User ID validation

    /*
    1) Checks that the user ID exists in the request. 
    2) Checks that the user ID is equal to a string. 
    3) Checks that the userID is not an empty string. 
    */

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

    

    // Experiences array validation.

    /*
    1) Checks for the existience of an experiences array. 
    2) Checks that the array contains at least one area of interest.
    3) Checks that each area of interest is an object.
    4) Checks that each area of interest has defined value, years and ID. 
    5) Checks that each area of interest object does not contain additional fields. 
    */
    req.check('experiences', 'Experiences array is required').exists()
    req.check('experiences', 'Each element in array must be a job experience object').custom(experiences => {

        for (var x = 0; x < experiences.length; x++) {
            if (typeof experiences[x] !== 'object') {
                return false
            }
        }
        return true
    })

    req.check('experiences', 'Each area of interest must define a value for title, company, start date and end date').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].title === 'undefined') {
                return false
            }
            if (experiences[x].company === 'undefined') {
                return false
            }
            if (experiences[x].startDate === 'undefined') {
                return false
            }
            if (experiences[x].endDate === 'undefined') {
                return false
            }
            if (experiences[x].isWorkingHere === 'undefined') {
                return false
            }
        }
        return true
    })

    req.check('experiences', 'Each experience object must have a title, company, start date, end date and isWorking properties').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            for (property in experiences[x]) {
                if (property !== 'title' && 
                    property !== 'company' &&
                    property !== 'startDate' &&
                    property !== 'endDate' &&
                    property !== 'isWorkingHere') {
                    return false
                }
            }
        }
        return true
    })

    //Experiences title field checks.

    /*
    1) Checks that a value is defined for every area of interest. 
    2) Checks that the value is a string value. 
    3) Checks that the value only contains letters and whitespace. 
    4) Checks that an empty string is not passed. 
    5) Checks if the title value is less than 2 false is returned. 
    */

    req.check('experiences', 'Each experience title must be defined').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].title === 'undefined') {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Each experiences title must be a string').custom(experiences => {
        if (experiences.length === 0) {
            return false
        }
        for (var x = 0; x < experiences.length; x++) {
            if (typeof experiences[x].title !== 'string') {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Each experience title can only contain letters and white space').custom(experiences => {
        if (experiences.length === 0) {
            return false
        }
        for (var x = 0; x < experiences.length; x++) {
            if (typeof experiences[x].title !== 'string') {
                return false
            }
            var match = experiences[x].title.match(/^[A-Za-z\s]+$/)
            if (match === undefined) {
                return false
            }
            if(!match){
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Experiences title can not be empty').custom(experiences => {
        if (experiences.title === 0) {
            return false
        }
        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].title === "") {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Check that experiences tiltle is at least two characters long').custom(experiences => {
        if (experiences.title === 0) {
            return false
        }
        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].title.length < 2) {
                return false
            }
        }
        return true
    })

    //Experiences company field checks.

    /*
    1) Checks that a compnay is defined for every area experience. 
    2) Checks that company is a string value.  
    4) Checks that an empty string is not passed. 
    */

    req.check('experiences', 'Each experience title must be defined').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].company === 'undefined') {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Each experiences title must be a string').custom(experiences => {
        if (experiences.company === 0) {
            return false
        }
        for (var x = 0; x < experiences.length; x++) {
            if (typeof experiences[x].company !== 'string') {
                return false
            }
        }
        return true
    })
    req.check('experiences', 'Experiences title can not be empty').custom(experiences => {
        if (experiences.company === 0) {
            return false
        }
        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].company === "") {
                return false
            }
        }
        return true
    })
    
    //Experience ID field

    /*
    1) Checks the area of interest ID field is defined. 
    2) Checks the area of interest ID field is an integer. 
    */

    req.check('experiences', 'Each areas of interest ID field must be defined').custom(experiences => {
        for (var x = 0; x < experiences.length; x++) {
            if (experiences[x].experienceID === 'undefined') {
                return false
            }
        }
        return true
    })

    req.check('experiences', 'Each area of interests ID field must be an integer').custom(experiences => {
        if (experiences.length === 0) {
            return false
        }

        for (var x = 0; x < experiences.length; x++) {
            // https://jsperf.com/numbers-and-integers
            if (experiences[x].experienceID !== parseInt(experiences[x].experienceID)) {
                return false
            }
        }
        return true
    })

    var errors = req.validationErrors(true)

    if (errors) {
        return errors
    }
}

// ValidYear method and greater than current year are necessary for checks. 
function validYear (year) {
    if (year.length !== 4) return false
    if (!year.match(/\d{4}/)) return false
    return true
  }

  function greaterThanCurrentYear(year) {
    if (parseInt(year) > 2018) return false
    return true
  }

//Start Date Field

    /*
    Check that the start date is not greater than the users age. 
    Check that the start date is not greater than the end date. 
    Do the basic checks on anything else. 
    */

//End date field

    /*
    Checks the area of interest ID field is defined. 
    Checks the area of interest ID field is an integer. 
    */