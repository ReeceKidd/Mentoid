var User = require('../../../models/user')
var logger = require('../../../src/logger.js')(module)
var matchingLogger = require('../../../src/Loggers/matchingLogger.js')(module)

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
const getValuesFromAreasOfInterest = require('./Sections/getValuesFromAreasOfInterest')

//Distance calculator
const getDistanceInKM = require('../../../DistanceCalculator/calculateDistanceBetweenUsers.js')


// These values are set as global parameters in order to prevent constant parameter passing. 
let currentUser = null
let currentUserName = null
let potentialMentee = null
let potentialMenteeUserName = null
let currentAreaOfInterest = null
let comparisonAreaOfInterest = null

let potentialMentees = []
let filteredPotentialMentees = []
let onlineMentees = []
let inPersonMentees = []

module.exports = getPotentialMentors = (req, res) => {

    resetMethod()

    var undefinedFields = checkUndefinedFields(req.params, ['userID', 'userName', 'sortType'])

    if (undefinedFields) {
        logError(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    currentUserName = req.params.userName
    logDebug(" is attempting to get potential mentees with request: " + JSON.stringify(req.params))

    userID = req.params.userID

    //Get current user details. 
    User.findById(userID, function (err, retreivedUser) {
        if (err) {
            logError(err)
            res.status(500)
            res.send({
                message: 'Could not match user with mentees',
                error: 'Server error'
            })
        }
        if (!retreivedUser) {
            logError("Could not find user with ID: " + userID)
            res.status(500)
            res.send({
                message: 'Could not find user with ID: ' + userID,
                error: 'Could not find user'
            })
        }

        currentUser = retreivedUser

        /*
        General search looks at all the potential mentees according to the users settings
        and available information. 
        */
        logDebug('Attempting to find a mentee for: ' + JSON.stringify(currentUser.userName, null, 2))
        logCurrentMenteeInformation(currentUser)
        let wantsAMenteeFor = getValuesFromAreasOfInterest(currentUser.menteeSettings.areasOfInterest)
        let languages = currentUser.menteeSettings.languages


        User.aggregate([{
                $match: {
                    "userName": {
                        $ne: currentUserName
                    }
                }
            },
            {
                $match: {
                    "menteeSettings.wouldLikeAMentor": true
                }
            },
            // Matches users with the same areas of interest values. 
            {
                $match: {
                    "menteeSettings.areasOfInterest": {
                        $elemMatch: {
                            value: {
                                $in: wantsAMenteeFor
                            }
                        }
                    }
                }
            }
        ], function (err, retreivedPotentialMentees) {
            if (err) {
                logError("Server error with logger when trying to retrieve users from aggregrate function")
                return;
            }

            if (retreivedPotentialMentees.length === 0) {
                logDebug("No potential mentees where found")
                res.status(200).send('No potential mentees where found')
                return
            } else {

                potentialMentees = retreivedPotentialMentees

                logNumberOfPotentialMentors()

                potentialMentees.forEach(function (currentPotentialMentee, index) {

                    let matchingLanguage = currentUser.menteeSettings.languages.some(r => currentPotentialMentee.mentorSettings.languages.includes(r))
                    if (matchingLanguage) {

                        //Arrays for storing similar interests. 
                        potentialMentee = currentPotentialMentee
                        potentialMenteeUserName = potentialMentee.userName
                        potentialMentee.mentorHasMoreExperience = []
                        potentialMentee.similarInterests = []
                        potentialMentee.compatibilityScore = 0

                        logPotentialMentorInformation(index)
                        deleteUnnecessaryInformation(potentialMentee)

                        currentUser.areasOfInterest.forEach(function (retrievedAreaOfInterest) {

                            currentAreaOfInterest = retrievedAreaOfInterest
                            currentAreaOfInterest.totalPoints = generateTotalsForEachAreaOfInterest(currentAreaOfInterest)

                            logCurrentAreaOfInterestInformation()

                            potentialMentee.mentorSettings.areasOfInterest.forEach(function (areaOfInterestToCompare) {

                                comparisonAreaOfInterest = areaOfInterestToCompare
                                comparisonAreaOfInterest.totalPoints = generateTotalsForEachAreaOfInterest(comparisonAreaOfInterest)

                                if (currentAreaOfInterest.value === comparisonAreaOfInterest.value) {
                                    logAppropriateSimilarInterestMessage()
                                    populatedPotentialMentee = populateSharedInterestObject(potentialMentee)

                                    if (currentAreaOfInterest.years > comparisonAreaOfInterest.years) {
                                        organizeByMentoringFormat(populatedPotentialMentee)

                                    } else {
                                        logNotExperiencedEnoughToMentorAreaOfInterest()
                                    }
                                } else {
                                    logAreaOfInterestWasNotAMatch()
                                }

                            })


                        });
                    }
                })

                logDebug('Starting number of potential mentees: ' + potentialMentees.length)
                logDebug('Number of matched online mentees: ' + onlineMentees.length)
                logDebug('Number of matched in person mentees: ' + inPersonMentees.length)

                if (currentUser.menteeSettings.prefferedMentoringFormats.length > 1) {
                    let onlineAndInPersonMentees = joinMentoringArrays()
                    console.log(JSON.stringify(onlineAndInPersonMentees, null, 2))
                    onlineAndInPersonMentees = removeDuplicates(onlineAndInPersonMentees, 'userName')
                    shuffle(onlineAndInPersonMentees)
                    res.status(200).send({
                        onlineAndInPersonMentees: onlineAndInPersonMentees
                    })
                    return
                }
                else if (currentUser.menteeSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
                    logDebug('Preffered mentoring format is online. ')
                    onlineMentees = removeDuplicates(onlineMentees, 'userName')
                    shuffle(onlineMentees)
                    res.status(200).send({
                       onlineMentees: onlineMentees
                    })
                    return
                }
                else if (currentUser.menteeSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
                    logDebug('Preffered mentoring format is in person')
                    logDebug('Number of in person mentees: ' + inPersonMentees.length)
                    inPersonMentees = removeDuplicates(inPersonMentees, 'userName')
                    logDebug('Attempting to sort users by distance')
                    sortByDistance()
                    res.status(200).send({
                        inPersonMentees: inPersonMentees
                    })
                    return
                }
                else {
                    //This means that user has no preferences set. 
                    let onlineAndInPersonMentees = joinMentoringArrays()
                    console.log(JSON.stringify(onlineAndInPersonMentees, null, 2))
                    onlineAndInPersonMentees = removeDuplicates(onlineAndInPersonMentees, 'userName')
                    shuffle(onlineAndInPersonMentees)
                    res.status(200).send({
                        onlineAndInPersonMentees: onlineAndInPersonMentees
                    })
                    return
                }
            }


        })


    })
}

function removeDuplicates( arr, prop ) {
    var obj = {};
    for ( var i = 0, len = arr.length; i < len; i++ ){
      if(!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
    }
    var newArr = [];
    for ( var key in obj ) newArr.push(obj[key]);
    return newArr;
  }

function joinMentoringArrays() {
    return inPersonMentees.concat(onlineMentees)
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function sortByDistance() {

    function sortNumber(a, b) {
        return a.distanceKM - b.distanceKM
    }

    inPersonMentees.sort(sortNumber)
}

function bestMatchedMentor() {

    filteredPotentialMentees.forEach(mentee => {
        //Sort by closest area of interest distance. 
    })

}

//This covers every possible combination of the two values in order to sort the information properly. 
function organizeByMentoringFormat(mentee) {

    if (currentUser.menteeSettings.prefferedMentoringFormats.length > 1) {
        logCurrentUserHasOnlineAndInPerson()

        if (potentialMentee.mentorSettings.prefferedMentoringFormats.length > 1) {
            let updatedMentor = generateDistanceInformation(mentee)
            addMentorToInPersonList(updatedMentor)
            addMentorToOnlineList(mentee)
        } else if (potentialMentee.mentorSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
            generateDistanceInformation(mentee)
            addMentorToInPersonList(mentee)
        } else if (potentialMentee.mentorSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
            addMentorToOnlineList(mentee)
        }

    } else if (currentUser.menteeSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
        if (potentialMentee.mentorSettings.prefferedMentoringFormats.length > 1) {
            let updatedMentor = generateDistanceInformation(mentee)
            addMentorToOnlineList(mentee)
            addMentorToInPersonList(updatedMentor)
        } else if (potentialMentee.mentorSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
            let updatedMentor = generateDistanceInformation()
            addMentorToInPersonList(updatedMentor)
        } else if (potentialMentee.mentorSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
            addMentorToOnlineList(mentee)
        }

    } else if (currentUser.menteeSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
        if (potentialMentee.mentorSettings.prefferedMentoringFormats.length > 1) {
            let updatedMentor = generateDistanceInformation()
            addMentorToInPersonList(updatedMentor)
            addMentorToOnlineList(mentee)
        } else if (potentialMentee.mentorSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
            let updatedMentor = generateDistanceInformation()
            addMentorToInPersonList(updatedMentor)
        } else if (potentialMentee.mentorSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
            addMentorToOnlineList(mentee)
        }
    }

}

function generateTotalsForEachAreaOfInterest(areaOfInterest) {
    return areaOfInterest.numberOfLikes +
        areaOfInterest.numberOfLinksClicked +
        areaOfInterest.articlesRead +
        areaOfInterest.videosWatched +
        areaOfInterest.pathsStudied

}

function resetSimilarInterests() {
    mentorHasMoreExperience = []
    mentorHasLessExperience = []
    mentorHasSameExperience = []
}

function resetMethod() {
    currentUser = null
    currentUserName = null
    potentialMentee = null
    potentialMenteeUserName = null
    currentAreaOfInterest = null
    comparisonAreaOfInterest = null

    //Arrays for storing similar interests. 
    mentorHasMoreExperience = []
    similarInterests = []


    potentialMentees = []
    filteredPotentialMentees = []
    onlineMentees = []
    inPersonMentees = []
}

function generateDistanceInformation() {

    let distance = getDistanceFromPotentialMentor()
    potentialMentee.distanceKM = distance
    potentialMentee.isWithinUsersRange = null
    potentialMentee.userIsWithinMentorsRange = null

    logLocationInformaion()
    if (distance <= currentUser.menteeSettings.maximumTravelDistanceKM) {
        potentialMentee.isWithinUsersRange = true
        logWithinUsersRange()

        if (distance <= potentialMentee.mentorSettings.maximumTravelDistanceKM) {
            logWithinMentorsRange()
            potentialMentee.userIsWithinMentorsRange = true
            return potentialMentee

        } else {
            logOutsideOfMentorsRange()
            potentialMentee.userIsWithinMentorsRange = false
            potentialMentee.outsideOfMentorsRangeBy = getOutOfRangeDistance()
            return potentialMentee
        }
    } else {
        logOutsideOfUsersRange()
        potentialMentee.isWithinUsersRange = false
        potentialMentee.outsideOfUsersRangeBy = getOutOfRangeDistance()
        return potentialMentee
    }
}

function addMentorToOnlineList() {
    onlineMentees.push(potentialMentee)
    logDebug('Potential mentee: ' + potentialMenteeUserName + ' has been added to the online list of mentees.')
}

function addMentorToInPersonList() {
    inPersonMentees.push(potentialMentee)
    logDebug('Potential mentee: ' + potentialMenteeUserName + ' has been added to the in person list of mentees.')
}

function populateSharedInterestObject(mentee) {

    if (comparisonAreaOfInterest.years > currentAreaOfInterest.years) {
        var differenceInExperience = comparisonAreaOfInterest.years - currentAreaOfInterest.years
        mentee.mentorHasMoreExperience.push({
            value: comparisonAreaOfInterest.value,
            yearsOfExperience: comparisonAreaOfInterest.years,
            differenceInExperience: differenceInExperience
        })
    } else if (comparisonAreaOfInterest.years <= currentAreaOfInterest.years) {
        var differenceInExperience = currentAreaOfInterest.years - comparisonAreaOfInterest.years
        mentee.similarInterests.push({
            value: comparisonAreaOfInterest.value,
            yearsOfExperience: comparisonAreaOfInterest.years,
            differenceInExperience: differenceInExperience
        })
    }
    return mentee
}

function deleteUnnecessaryInformation() {
    delete potentialMentee.password
    delete potentialMentee.confirmPassword
    delete potentialMentee.terms
}

//Getters. 
function getDistanceFromPotentialMentor() {
    let distance = getDistanceInKM(currentUser.location, potentialMentee.location)
    return distance
}

function getOutOfRangeDistance() {
    if (currentUser.maximumTravelDistanceKM < potentialMentee.maximumTravelDistanceKM) {
        return potentialMentee.mentorSettings.maximumTravelDistanceKM = currentUser.menteeSettings.maximumTravelDistanceKM
    } else {
        return currentUser.menteeSettings.maximumTravelDistanceKM - potentialMentee.mentorSettings.maximumTravelDistanceKM
    }
}



//Add user names to identify each request. 
function logError(errorMessage) {
    try {
        var userNameAddon = 'User--' + currentUserName + ': '
        logger.error(userNameAddon + errorMessage)
        matchingLogger.error(userNameAddon + errorMessage)
    } catch (error) {
        logger.error(error)
    }
}

function logDebug(debugMessage) {
    try {
        var userNameAddon = 'User--' + currentUserName + ': '
        logger.debug(userNameAddon + debugMessage)
        matchingLogger.debug(userNameAddon + debugMessage)
    } catch (error) {
        logger.debug(error)
    }
}

//Log messages go to the bottom. 

function logPotentialMentorsDistanceSort() {
    let potentialMentorNames = []
    filteredPotentialMentees.forEach(mentee => {
        potentialMentorNames.push({
            name: mentee.userName,
            distanceKM: mentee.distanceKM
        })
    })
    return potentialMentorNames
}

function logNumberOfPotentialMentors() {
    logDebug("Number of potential mentees: " + potentialMentees.length)
}

function logMentorPreferenceNotSuitable() {
    logDebug('Potential mentee: ' + potentialMenteeUserName + 'is not suitable because of their mentee preferences: ' +
        JSON.stringify(potentialMentee.mentorSettings.prefferedMentoringFormats) + ' which do not match with ' +
        JSON.stringify(currentUser.menteeSettings.prefferedMentoringFormats))
}

function logWithinUsersRange() {
    logDebug(getDistanceFromPotentialMentor() + 'KM is within the current users maximum distance of: ' + currentUser.menteeSettings.maximumTravelDistanceKM + 'KM')
}

function logOutsideOfUsersRange() {
    logDebug(getDistanceFromPotentialMentor() + 'KM is outside the current users maximum distance of: ' +
        currentUser.menteeSettings.maximumTravelDistanceKM +
        'KM by ' + getOutOfRangeDistance() + 'KM.')
}

function logWithinMentorsRange() {
    logDebug(getDistanceFromPotentialMentor() + 'KM is within the potential mentees maximum distance of: ' + potentialMentee.mentorSettings.maximumTravelDistanceKM + 'KM')
    logDebug(currentUserName + ' potential mentee: ' + potentialMenteeUserName + ' are a distance match.')
}

function logOutsideOfMentorsRange() {
    logDebug(getDistanceFromPotentialMentor() + 'KM is outside the mentees maximum distance of: ' + potentialMentee.mentorSettings.maximumTravelDistanceKM +
        ' by ' + getOutOfRangeDistance() + 'KM.')
}

function logBothUsersHaveOnlineAndInPerson() {
    logDebug(currentUserName + ' and potential mentee ' + potentialMenteeUserName + ' both have online and in person in their mentoring preferences.')
}

function logCurrentUserHasOnlineAndInPerson() {
    logDebug(currentUserName + " has both online and in person as options")
}

function logCurrentUserHasOnlineInPrefferedMentoringOption() {
    logDebug(currentUserName + " has online as a preffered mentoring option")
}

function logCurrentUserHasInPersonAsPrefferedMentoringOption() {
    logDebug(currentUserName + " has in person as a preffered mentoring option")
}

function logPotentialMentorHasOnlineAndInPerson() {
    logDebug(potentialMenteeUserName + " has both online and in person as options")
}

function logPotentialMentorHasOnlineInPrefferedMentoringOption() {
    logDebug(potentialMenteeUserName + " has online as a preffered mentoring option")
}

function logPotentialMentorHasInPersonAsPrefferedMentoringOption() {
    logDebug(potentialMenteeUserName + " has in person as a preffered mentoring option")
}

function logLocationInformaion() {
    logDebug("Current users location: " + currentUser.location + ' , Potential mentee: ' + potentialMenteeUserName + ' location: ' + potentialMentee.location)
    logDebug("Current users maximum travel distance: " + currentUser.menteeSettings.maximumTravelDistanceKM + "KM")
    logDebug("Potential mentee: " + potentialMenteeUserName + " maximum travel distance is: " + potentialMentee.mentorSettings.maximumTravelDistanceKM + "KM")
}

function logCurrentAreaOfInterestInformation() {
    logDebug("Attempting to match area of inteterest:( " + currentAreaOfInterest.value + " ), years of experience: " + currentAreaOfInterest.years)
}

function logPotentialMentorInformation(index) {
    logDebug("Comparing potential mentee " + potentialMenteeUserName + " number: " + index)
}

function logNotExperiencedEnoughToMentorAreaOfInterest() {
    logDebug('Potential mentee: ' + potentialMenteeUserName + 'is not experienced enough to mentee in: ' + comparisonAreaOfInterest.value +
        'as they only have ' + comparisonAreaOfInterest.years + ' experience compared to current users: ' + currentUser.userName + ' ' + currentAreaOfInterest.years +
        ' years of experience.')
}

function logAreaOfInterestWasNotAMatch() {
    logDebug('Potential mentee: ' + potentialMenteeUserName + ' area of interest: ' + comparisonAreaOfInterest.value + ' was not a match with: ' + currentAreaOfInterest.value)
}

function logCurrentMenteeInformation() {
    var prefferedMentoringFormats = currentUser.menteeSettings.prefferedMentoringFormats
    logDebug("Preffered mentoring formats: " + JSON.stringify(prefferedMentoringFormats, null, 2))
    logWantsAMentorFor(currentUser.menteeSettings.areasOfInterest)
    let languages = currentUser.menteeSettings.languages
    logDebug('Mentee languages: ' + languages)
}

function logAppropriateSimilarInterestMessage() {
    logSharedInterest()
    logSuitableToMentor()
}

function logSharedInterest() {
    logDebug("SHARED INTEREST: (" + currentAreaOfInterest.value + ") with potential mentee: " + potentialMenteeUserName)
}

function logSuitableToMentor() {
    if (currentAreaOfInterest.years < comparisonAreaOfInterest.years) {
        var differenceInExperience = comparisonAreaOfInterest.years - currentAreaOfInterest.years
        logDebug('Potential mentee ' + potentialMenteeUserName + " is suitable to mentee as they have " + comparisonAreaOfInterest.years + " years experience in " + comparisonAreaOfInterest.value +
            " which is a +" + differenceInExperience + " years difference.")
    } else {
        logDebug('Potential mentee ' + potentialMenteeUserName + " is not suitable to mentee " + comparisonAreaOfInterest.value + ' as they have ' +
            comparisonAreaOfInterest.years + " years of experience, which is less than the " +
            currentAreaOfInterest.years + " experience the current user has")
    }
}

function logWantsAMentorFor(areasOfInterest) {
    var wantsAMenteeFor = getValuesFromAreasOfInterest(areasOfInterest)
    logDebug("Wants a mentee for: " + JSON.stringify(wantsAMenteeFor, null, 2))
}