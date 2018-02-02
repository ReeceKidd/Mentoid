var User = require('../../../models/user')

const matchingController = {}

//Checks that required fields are defined.
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

// Field checkers ensure only relevant fields are passed to request
const checkID = require('../../FieldCheckers/checkForID')

//Checks that requests are the correct type
const basicTypeCheck = require('../../TypeCheckers/Registration/basicTypeCheck')

//Sanitizes different requests
const sanitizeUserID = require('../../Sanitizers/userID')

// Validatiors
const checkIDValidation = require('../../Validators/userID')

//Needs to take the ID of the current user and get the matches based of that. 

module.exports = getPotentialMentors = (req, res) => {

    var undefinedFields = checkUndefinedFields(req.params, ['userID'])

    if (undefinedFields) {
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    
    //Checks that fields only defined in the schema are passed. 
    var unwantedFields = checkID(req)

    if (unwantedFields) {
        res.status(700).send({
            message: unwantedFields,
            error: 'Additional fields found'
        })
        return
    }

    //Checks that each of the fields are type string. 
    var badType = basicTypeCheck(req.params)

    if (badType) {
        res.status(850).send({
            message: badType,
            error: 'Invalid type in request'
        })
        return
    }

    //Validation. Cannot send status code as that spams the client console.
    var errors = checkIDValidation(req)
    if (errors) {
        res.send({
            message: errors
        })
        return
    }

    //Santize input before being passed to database
    sanitizeUserID(req.params)

    var userID = req.params.userID
    
    //Get current user details. 
    User.findById(userID, function (err, currentUser) {
        if (err) {
            res.status(500)
            res.send({
                message: 'Could not match user with mentors',
                error: 'Server error'
            })
        }

        //console.log(currentUser)

        var areasOfInterestValues = []

        for(var x = 0; x < currentUser.areasOfInterest.length; x++){
            var currentAreaOfInterest = currentUser.areasOfInterest[x]
            areasOfInterestValues.push(currentAreaOfInterest.value)
        }

        //Find other users with similar areas of interest. 
        var query = {areasOfInterest: {$elemMatch: {value: { $in: areasOfInterestValues }}}}
       
        User.find(query, function (err, users) {
            if (err) {
                res.status(500)
                res.send({
                    message: 'Could not get users age',
                    error: 'Server error'
                })
            }

            

            //Need to compare each user to my current user. 

            var potentialMentors = []

            for(var x = 0; x < users.length; x++){

                var comparisonUser = users[x]
                //console.log(comparisonUser.userName)

                for(var y = 0; y < comparisonUser.areasOfInterest.length; y++){

                    var currentAreaOfInterest = comparisonUser.areasOfInterest[y]
                    //console.log('matched user area of interest ' + currentAreaOfInterest)
                    //Loop through users areas of interests and see if values are the same,
                    //f they are check the years value. 
                    for(var w = 0; w < currentUser.areasOfInterest.length; w++){
                        
                        if(currentUser.areasOfInterest[w].value === currentAreaOfInterest.value){

                            //console.log('Current user years: ' + currentUser.areasOfInterest[w].years)
                            //console.log('Matched user years: ' + currentAreaOfInterest.years)
                            
                            if(currentUser.areasOfInterest[w].years < currentAreaOfInterest.years){
                                potentialMentors.push(comparisonUser)
                            }
                        }
                    }

                }


            }

            //Do checks to calculate similarities. 

            
            
            for(var x = 0; x < potentialMentors.length; x++){
                
                var currentAreasOfInterest = potentialMentors[x].areasOfInterest
                
                var similarityScore = 0;

                //Loop through all the areas of interest
                for(var w = 0; w < currentAreaOfInterest; w++){
                    var currentAreaOfInterest = currentAreaOfInterest[w]
                    for(var y = 0; y < currentUser.areasOfInterest.length; y++){
                       
                        if(currentUser.areasOfInterest[y].value === currentAreaOfInterest.value){
                            similarityScore++
                        }
                    }
                   
                    


                }

                //Add the similarity score. 
                potentialMentors[x].similarityScore = 9000000
                console.log(potentialMentors[x])

               
            }

            

            res.status(200).send(potentialMentors)
            

        })


    })

    

}


