module.exports = function basicRegistrationValidation(req) {

    req.check('firstName', 'First name must be at least two characters long').isLength({
        min: 2
    })
    req.check('firstName', 'First name must be at least two characters long').isLength({
        min: 2
    })
    req.check('firstName', 'First name cannot be greater than 100 characters long').isLength({
        max: 100
    })

    req.check('lastName', 'Last name is required for basic registration').exists()
    req.check('lastName', 'Last name must be at least two characters long').isLength({
        min: 2
    })
    req.check('lastName', 'Last name cannot be greater than 100 characters long').isLength({
        max: 100
    })

    req.check('userName', 'Username is required for basic registration').exists()
    req.check('userName', 'Username must be alphanumeric and cannot contain spaces').isAlphanumeric()
    req.check('userName', 'Username must be at least 1 character long').isLength({
        min: 1
    })
    req.check('userName', 'Username cannot be greater than 50 characters long').isLength({
        max: 50
    })

    req.check('email', 'Email is required for basic registration').exists()
    req.check('email', 'Invalid email').isEmail()

    req.check('password', 'Password is required for basic registration').exists()
    req.check('password', 'Password should be eight or more characters').isLength({
        min: 8
    })
    req.check('password', 'Password does not match confirm password').equals(req.body.confirmPassword)

    req.check('confirmPassword', 'Confirmation password is required for basic registration').exists()
    req.check('confirmPassword', 'Password should be eight or more characters').isLength({
        min: 8
    })
    req.check('confirmPassword', 'Confirmation password does not equal password').equals(req.body.password)

    req.check('age', 'Age is required for basic registration').exists()
    req.check('age', 'Age must be a valid number between 5 and 120').isInt(this, {
        min: 5,
        max: 120
    })

    // Accepted countries must be updated if the list of accepted countries is updated. 
    var acceptedCountries = ['United Kingdom','United States', 'Spain', 'France', 'Germany']

    req.check('country', 'Country is required for basic registration').exists()
    req.check('country', 'Country must be equal to one of the allowed values').isIn(acceptedCountries)

    req.check('terms', 'The terms must be accepted to register').equals('true').isBoolean()

    var errors = req.validationErrors(true)

    if (errors) {
        return errors
    }
}