module.exports = function updateAreasOfInterestValidation(req) {

    console.log(typeof 1.2)

    req.check('_id', 'User ID must be sent with request').exists()

    //Areas of interest array validation.
    req.check('areasOfInterest', 'Areas of interest request is required').exists()
    req.check('areasOfInterest', 'You must have at least one area of interest').custom(areasOfInterest => {
        return areasOfInterest.length > 0
    })
    req.check('areasOfInterest', 'Each element in array must be an area of interest object').custom(areasOfInterest => {
        for(var x = 0; x < areasOfInterest.length; x++){
            if(typeof areasOfInterest !== 'object'){
                return false
            }
        }
        return true
    })
    req.check('areasOfInterest', 'Each area of interest must contain a value, years of experience and ID').custom(areasOfInterest => {
        for(var x = 0; x < areasOfInterest.length; x++){
            console.log(areasOfInterest[x].value)
            if(areasOfInterest[x].value === 'undefined'){
                return false
            }
            if(areasOfInterest[x].years === 'undefined'){
                return false
            }
            if(areasOfInterest[x].id === 'undefined'){
                return false
            }
        }
        return true
    })

    //Area of interest object value checks. 
    req.check('areasOfInterest', 'Each areas of interest value must be defined').custom(areasOfInterest => {
        for(var x = 0; x < areasOfInterest.length; x++){
            if(areasOfInterest[x].value === 'undefined'){
                return false
            }
        }
        return true
    })
    req.check('areasOfInterest', 'Each area of interests value must be a string').custom(areasOfInterest => {
        if(areasOfInterest.length === 0){
            return false
        }
        for(var x = 0; x < areasOfInterest.length; x++){
            if(typeof areasOfInterest[x].value !== 'string') {
                return false
            }
        }
        return true
    })
    req.check('areasOfInterest', 'Area of interest values can only contain letters and white space').custom(areasOfInterest => {
        if(areasOfInterest.length === 0){
            return false
        }
        for(var x = 0; x < areasOfInterest.length; x++){
            if(typeof areasOfInterest[x].value !== 'string'){
                continue
            }
            var match = areasOfInterest[x].value.match(/^[A-Za-z\s]+$/)
            if(match === undefined){
                return false
            }
        }
        return true
    })
    req.check('areasOfInterest', 'Area of interest values can not be empty').custom(areasOfInterest => {
        if(areasOfInterest.length === 0){
            return false
        }
        for(var x = 0; x < areasOfInterest.length; x++){
            if(areasOfInterest[x].value === ""){
                return false
            }
        }
        return true
    })

    //Area of interest years value. 
    req.check('areasOfInterest', 'Each areas of interest years value must be defined').custom(areasOfInterest => {
        for(var x = 0; x < areasOfInterest.length; x++){
            if(areasOfInterest[x].years === 'undefined'){
                return false
            }
        }
        return true
    })
    //This one does not work yet work on tommorow. 
    req.check('areasOfInterest', 'Each area of interests years field must be an integer').custom(areasOfInterest => {
        if(areasOfInterest.length === 0){
            return false
        }
        for(var x = 0; x < areasOfInterest.length; x++){
            // https://jsperf.com/numbers-and-integers
            if(typeof !areasOfInterest[x].years === 'number' && !(areasOfInterest%1)=== 0) {
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