const isValidMongoObjectID = require('../../CustomValidators/isValidMongoObjectID')
const date = new Date()
const currentYear = date.getFullYear()

function validYear(year) {
    if (year.length !== 4) return false
    if (!year.match(/\d{4}/)) return false
    return true
}

function greaterThanCurrentYear(currentYear) {
    if (parseInt(year) > currentYear) return false
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



    //Experiences title field checks.

    

    const maxTitleLength = 200
    const minTitleLength = 1

    

    
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
Checks the area of interest ID field is defined. 
Checks the area of interest ID field is an integer. 
*/