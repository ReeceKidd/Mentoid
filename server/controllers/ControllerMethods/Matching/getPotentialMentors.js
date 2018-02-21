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

// Search sections 
const getMentoringFormatQuery = require('./Sections/mentoringFormats')
const getValuesFromAreasOfInterest = require('./Sections/getValuesFromAreasOfInterest')

//Distance calculator
const getDistanceInKM = require('../../../DistanceCalculator/calculateDistanceBetweenUsers.js')

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


        /*
        General search looks at all the potential mentors according to the users settings
        and available information. 
        */
        //console.log(currentUser)

        /*
        Going to need to be like a tree that follows a different search path depending on the users preferences. 
        Deterime if the user wants online, in person or both. 
        */

        //The format will be try to match to their preferences if they don't have preferences just pass all the available options in the
        // search, so if they don't have education pass all the education options when generating that query. 

        //Initilise the variables needed to generate the queries. 
        var menteePreferences = currentUser.menteePreferences
        var prefferedMentoringFormats = menteePreferences.prefferedMentoringFormats
        var areasOfInterest = menteePreferences.areasOfInterest



        var mentoringFormatQuery = getMentoringFormatQuery(prefferedMentoringFormats)
        var wantsAMentorFor = getValuesFromAreasOfInterest(areasOfInterest)

        User.aggregate([
            //Matches with users how want a mentee. 
            {
                $match: {
                    "menteePreferences.wouldLikeAMentee": true
                }
            },
            //Matches users with the same areas of interest values. 
            {
                $match: {
                    "menteePreferences.areasOfInterest": {
                        $elemMatch: {
                            value: {
                                $in: wantsAMentorFor
                            }
                        }
                    }
                }
            }, 
            {
                $match: {
                    "mentorPreferences.languages": {
                        $elemMatch: {
                            $in: currentUser.menteePreferences.languages
                        }
                    }
                }
            }
        ], function (err, potentialMentors) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Current user languages: " + currentUser.menteePreferences.mentoringLanguages.toString())


            let filteredPotentialMentors = [];
            console.log('Potential mentors: ' + potentialMentors.length)
            var count = 0

            //Potential mentors can be used if nothing is found. 
            console.log("Current user age: " + currentUser.age)

            potentialMentors.forEach(potentialMentor => {

                currentUser.areasOfInterest.filter(function (currentAreaOfInterest) {

                    return potentialMentor.menteePreferences.areasOfInterest.filter(function (comparisonAreaOfInterest) {

                        if (currentAreaOfInterest.value === comparisonAreaOfInterest.value && currentAreaOfInterest.years < comparisonAreaOfInterest.years) {

                            var distance = getDistanceInKM(currentUser.location, potentialMentor.location)

                            if ((distance) < potentialMentor.menteePreferences.maximumTravelDistanceKM) {

                                var educationMatch

                                var minimumAgeMatch = getMinimumAgeMatch(currentUser.menteePreferences.minimumAge, potentialMentor.age)
                                console.log('Minimum age match: ' + minimumAgeMatch)
                                console.log("User value: " + currentAreaOfInterest.value + " years of experience: " + currentAreaOfInterest.years)
                                console.log("-----")
                                console.log("Potential mentor value: " + comparisonAreaOfInterest.value + " years of experience: " + comparisonAreaOfInterest.years)
                                var maximumAgeMatch = getMaximumAgeMatch(currentUser.menteePreferences.maximumAge, potentialMentor.age)
                                potentialMentor.minimumAgeMatch = minimumAgeMatch
                                potentialMentor.maximumAgeMatch = maximumAgeMatch
                                filteredPotentialMentors.push(potentialMentor)
                            }
                        }
                    })
                });

            });

            function getEducationMatches() {
                var educationMatches = []
                return educationMatches
            }

            function getMinimumAgeMatch(minimumAge, potentialMentorAge) {
                if (minimumAge > potentialMentorAge) {
                    return false
                }
                return true
            }

            function getMaximumAgeMatch(maximumAge, potentialMentorAge) {
                if (potentialMentorAge > maximumAge) {
                    return false
                }
                return true
            }

            console.log('Filtered potential mentors: ' + filteredPotentialMentors.length)
            //Should probably only push the id and then get the other info using the API. 
            // I think this handles the distinct cases as well. 
            //These aren't matchd they will simple increase the sort order. 
            //Match based on languages. 
            //Match based on education level. 
            //Match based on youngest age. 
            //Match based on oldest age. 

            //Return the users according to the ID's. 

            res.status(200).send({
                potentialMentors: filteredPotentialMentors
            })









            //console.log(result)
            //console.log(result.length)
            //Get the ID's of users who have an area of ineterest with less values in
            //Need to do the location check if it is in person as well. 
            //Pass the ID's to the aggregration pipeline.
            //After this create another aggregation that goes through the other mentor preferences options. 
        });

    })





    // User.find(query, function (err, users) {
    //     if (err) {
    //         res.status(500)
    //         res.send({
    //             message: 'Could not get users age',
    //             error: 'Server error'
    //         })
    //     }

    //     //Need to compare each user to my current user. 

    //     var potentialMentors = []

    //     for (var x = 0; x < users.length; x++) {

    //         var comparisonUser = users[x]
    //         //console.log(comparisonUser.userName)

    //         for (var y = 0; y < comparisonUser.areasOfInterest.length; y++) {

    //             var currentAreaOfInterest = comparisonUser.areasOfInterest[y]
    //             //console.log('matched user area of interest ' + currentAreaOfInterest)
    //             //Loop through users areas of interests and see if values are the same,
    //             //f they are check the years value. 
    //             for (var w = 0; w < currentUser.areasOfInterest.length; w++) {

    //                 if (currentUser.areasOfInterest[w].value === currentAreaOfInterest.value) {

    //                     //console.log('Current user years: ' + currentUser.areasOfInterest[w].years)
    //                     //console.log('Matched user years: ' + currentAreaOfInterest.years)

    //                     if (currentUser.areasOfInterest[w].years < currentAreaOfInterest.years) {
    //                         potentialMentors.push(comparisonUser)
    //                     }
    //                 }
    //             }

    //         }


    //     }

    //     //Do checks to calculate similarities. 

    //     for (var x = 0; x < potentialMentors.length; x++) {

    //         var currentAreasOfInterest = potentialMentors[x].areasOfInterest

    //         var similarityScore = 0;

    //         //Loop through all the areas of interest
    //         for (var w = 0; w < currentAreaOfInterest; w++) {
    //             var currentAreaOfInterest = currentAreaOfInterest[w]
    //             for (var y = 0; y < currentUser.areasOfInterest.length; y++) {

    //                 if (currentUser.areasOfInterest[y].value === currentAreaOfInterest.value) {
    //                     similarityScore++
    //                 }
    //             }




    //         }

    //         //Add the similarity score. 
    //         potentialMentors[x].similarityScore = 9000000
    //         //console.log(potentialMentors[x])


    //}
    //res.status(200).send("Not quite right")

}