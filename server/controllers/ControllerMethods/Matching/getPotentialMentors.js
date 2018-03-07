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
let potentialMentor = null
let potentialMentorUserName = null
let currentAreaOfInterest = null
let comparisonAreaOfInterest = null




let potentialMentors = []
let filteredPotentialMentors = []
let onlineMentors = []
let inPersonMentors = []

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
    logError(" is attempting to get potential mentors with request: " + JSON.stringify(req.params))

    userID = req.params.userID

    //Get current user details. 
    User.findById(userID, function (err, retreivedUser) {
        if (err) {
            logError(err)
            res.status(500)
            res.send({
                message: 'Could not match user with mentors',
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
        General search looks at all the potential mentors according to the users settings
        and available information. 
        */
        logDebug('Attempting to find a mentor for: ' + JSON.stringify(currentUser.userName, null, 2))
        logCurrentMenteeInformation(currentUser)
        let wantsAMentorFor = getValuesFromAreasOfInterest(currentUser.menteeSettings.areasOfInterest)
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
                    "mentorSettings.wouldLikeToMentor": true
                }
            },
            // Matches users with the same areas of interest values. 
            {
                $match: {
                    "mentorSettings.areasOfInterest": {
                        $elemMatch: {
                            value: {
                                $in: wantsAMentorFor
                            }
                        }
                    }
                }
            }
        ], function (err, retreivedPotentialMentors) {
            if (err) {
                logError("Server error with logger when trying to retrieve users from aggregrate function")
                return;
            }

            if (retreivedPotentialMentors.length === 0) {
                logError("No potential mentors where found")
                res.status(200).send('No potential mentors where found')
                return
            } else {

                potentialMentors = retreivedPotentialMentors

                logNumberOfPotentialMentors()

                potentialMentors.forEach(function (currentPotentialMentor, index) {

                    let matchingLanguage = currentUser.menteeSettings.languages.some(r => currentPotentialMentor.mentorSettings.languages.includes(r))
                    if (matchingLanguage) {

                        //Arrays for storing similar interests. 
                        potentialMentor = currentPotentialMentor
                        potentialMentorUserName = potentialMentor.userName
                        potentialMentor.mentorHasMoreExperience = []
                        potentialMentor.similarInterests = []
                        potentialMentor.compatibilityScore = 0

                        logPotentialMentorInformation(index)
                        deleteUnnecessaryInformation(potentialMentor)

                        currentUser.areasOfInterest.forEach(function (retrievedAreaOfInterest) {

                            currentAreaOfInterest = retrievedAreaOfInterest
                            currentAreaOfInterest.totalPoints = generateTotalsForEachAreaOfInterest(currentAreaOfInterest)

                            logCurrentAreaOfInterestInformation()

                            potentialMentor.mentorSettings.areasOfInterest.forEach(function (areaOfInterestToCompare) {

                                comparisonAreaOfInterest = areaOfInterestToCompare
                                comparisonAreaOfInterest.totalPoints = generateTotalsForEachAreaOfInterest(comparisonAreaOfInterest)

                                if (currentAreaOfInterest.value === comparisonAreaOfInterest.value) {
                                    logAppropriateSimilarInterestMessage()
                                    populatedPotentialMentor = populateSharedInterestObject(potentialMentor)

                                    if (comparisonAreaOfInterest.years > currentAreaOfInterest.years) {
                                        organizeByMentoringFormat(populatedPotentialMentor)

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

                logDebug('Starting number of potential mentors: ' + potentialMentors.length)
                logDebug('Number of matched online mentors: ' + onlineMentors.length)
                logDebug('Number of matched in person mentors: ' + inPersonMentors.length)

                if (currentUser.menteeSettings.prefferedMentoringFormats.length > 1) {
                    let onlineAndInPersonMentors = joinMentoringArrays()
                    console.log(JSON.stringify(onlineAndInPersonMentors, null, 2))
                    onlineAndInPersonMentors = removeDuplicates(onlineAndInPersonMentors, 'userName')
                    shuffle(onlineAndInPersonMentors)
                    res.status(200).send({
                        onlineAndInPersonMentors: onlineAndInPersonMentors
                    })
                    return
                }
                if (currentUser.menteeSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
                    logDebug('Entered in person method. ')
                    onlineMentors = removeDuplicates(onlineMentors, 'userName')
                    shuffle(onlineMentors)
                    res.status(200).send({
                       onlineMentors: onlineMentors
                    })
                    return
                }
                if (currentUser.menteeSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
                    logDebug('Entered online method')
                    inPersonMentors = removeDuplicates(inPersonMentors)
                    sortByDistance()
                    res.status(200).send({
                        inPersonMentors: inPersonMentors
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
    return inPersonMentors.concat(onlineMentors)
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

    inPersonMentors.sort(sortNumber)
}

function bestMatchedMentor() {

    filteredPotentialMentors.forEach(mentor => {
        //Sort by closest area of interest distance. 
    })

}

//This covers every possible combination of the two values in order to sort the information properly. 
function organizeByMentoringFormat(mentor) {

    if (currentUser.menteeSettings.prefferedMentoringFormats.length > 1) {
        logCurrentUserHasOnlineAndInPerson()

        if (potentialMentor.mentorSettings.prefferedMentoringFormats.length > 1) {
            let updatedMentor = generateDistanceInformation(mentor)
            addMentorToInPersonList(updatedMentor)
            addMentorToOnlineList(mentor)
        } else if (potentialMentor.mentorSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
            generateDistanceInformation(mentor)
            addMentorToInPersonList(mentor)
        } else if (potentialMentor.mentorSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
            addMentorToOnlineList(mentor)
        }

    } else if (currentUser.menteeSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
        if (potentialMentor.mentorSettings.prefferedMentoringFormats.length > 1) {
            let updatedMentor = generateDistanceInformation(mentor)
            addMentorToOnlineList(mentor)
            addMentorToInPersonList(updatedMentor)
        } else if (potentialMentor.mentorSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
            let updatedMentor = generateDistanceInformation()
            addMentorToInPersonList(updatedMentor)
        } else if (potentialMentor.mentorSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
            addMentorToOnlineList(mentor)
        }

    } else if (currentUser.menteeSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
        if (potentialMentor.mentorSettings.prefferedMentoringFormats.length > 1) {
            let updatedMentor = generateDistanceInformation()
            addMentorToInPersonList(updatedMentor)
            addMentorToOnlineList(mentor)
        } else if (potentialMentor.mentorSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
            let updatedMentor = generateDistanceInformation()
            addMentorToInPersonList(updatedMentor)
        } else if (potentialMentor.mentorSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
            addMentorToOnlineList(mentor)
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
    potentialMentor = null
    potentialMentorUserName = null
    currentAreaOfInterest = null
    comparisonAreaOfInterest = null

    //Arrays for storing similar interests. 
    mentorHasMoreExperience = []
    similarInterests = []


    potentialMentors = []
    filteredPotentialMentors = []
    onlineMentors = []
    inPersonMentors = []
}

function generateDistanceInformation() {

    let distance = getDistanceFromPotentialMentor()
    potentialMentor.distanceKM = distance
    potentialMentor.isWithinUsersRange = null
    potentialMentor.userIsWithinMentorsRange = null

    logLocationInformaion()
    if (distance <= currentUser.menteeSettings.maximumTravelDistanceKM) {
        potentialMentor.isWithinUsersRange = true
        logWithinUsersRange()

        if (distance <= potentialMentor.mentorSettings.maximumTravelDistanceKM) {
            logWithinMentorsRange()
            potentialMentor.userIsWithinMentorsRange = true
            return potentialMentor

        } else {
            logOutsideOfMentorsRange()
            potentialMentor.userIsWithinMentorsRange = false
            potentialMentor.outsideOfMentorsRangeBy = getOutOfRangeDistance()
            return potentialMentor
        }
    } else {
        logOutsideOfUsersRange()
        potentialMentor.isWithinUsersRange = false
        potentialMentor.outsideOfUsersRangeBy = getOutOfRangeDistance()
        return potentialMentor
    }
}

function addMentorToOnlineList() {
    onlineMentors.push(potentialMentor)
    logError('Potential mentor: ' + potentialMentorUserName + ' has been added to the online list of mentors.')
}

function addMentorToInPersonList() {
    inPersonMentors.push(potentialMentor)
    logError('Potential mentor: ' + potentialMentorUserName + ' has been added to the in person list of mentors.')
}

function populateSharedInterestObject(mentor) {

    if (comparisonAreaOfInterest.years > currentAreaOfInterest.years) {
        var differenceInExperience = comparisonAreaOfInterest.years - currentAreaOfInterest.years
        mentor.mentorHasMoreExperience.push({
            value: comparisonAreaOfInterest.value,
            yearsOfExperience: comparisonAreaOfInterest.years,
            differenceInExperience: differenceInExperience
        })
    } else if (comparisonAreaOfInterest.years <= currentAreaOfInterest.years) {
        var differenceInExperience = currentAreaOfInterest.years - comparisonAreaOfInterest.years
        mentor.similarInterests.push({
            value: comparisonAreaOfInterest.value,
            yearsOfExperience: comparisonAreaOfInterest.years,
            differenceInExperience: differenceInExperience
        })
    }
    return mentor
}

function deleteUnnecessaryInformation() {
    delete potentialMentor.password
    delete potentialMentor.confirmPassword
    delete potentialMentor.terms
}

//Getters. 
function getDistanceFromPotentialMentor() {
    let distance = getDistanceInKM(currentUser.location, potentialMentor.location)
    return distance
}

function getOutOfRangeDistance() {
    if (currentUser.maximumTravelDistanceKM < potentialMentor.maximumTravelDistanceKM) {
        return potentialMentor.mentorSettings.maximumTravelDistanceKM = currentUser.menteeSettings.maximumTravelDistanceKM
    } else {
        return currentUser.menteeSettings.maximumTravelDistanceKM - potentialMentor.mentorSettings.maximumTravelDistanceKM
    }
}



//Handle logging for the matching section. 

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
        logger.error(userNameAddon + debugMessage)
        matchingLogger.debug(userNameAddon + debugMessage)
    } catch (error) {
        logger.error(error)
    }
}

//Log messages go to the bottom. 

function logPotentialMentorsDistanceSort() {
    let potentialMentorNames = []
    filteredPotentialMentors.forEach(mentor => {
        potentialMentorNames.push({
            name: mentor.userName,
            distanceKM: mentor.distanceKM
        })
    })
    return potentialMentorNames
}

function logNumberOfPotentialMentors() {
    logError("Number of potential mentors: " + potentialMentors.length)
}

function logMentorPreferenceNotSuitable() {
    logDebug('Potential mentor: ' + potentialMentorUserName + 'is not suitable because of their mentor preferences: ' +
        JSON.stringify(potentialMentor.mentorSettings.prefferedMentoringFormats) + ' which do not match with ' +
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
    logDebug(getDistanceFromPotentialMentor() + 'KM is within the potential mentors maximum distance of: ' + potentialMentor.mentorSettings.maximumTravelDistanceKM + 'KM')
    logDebug(currentUserName + ' potential mentor: ' + potentialMentorUserName + ' are a distance match.')
}

function logOutsideOfMentorsRange() {
    logDebug(getDistanceFromPotentialMentor() + 'KM is outside the mentors maximum distance of: ' + potentialMentor.mentorSettings.maximumTravelDistanceKM +
        ' by ' + getOutOfRangeDistance() + 'KM.')
}

function logBothUsersHaveOnlineAndInPerson() {
    logDebug(currentUserName + ' and potential mentor ' + potentialMentorUserName + ' both have online and in person in their mentoring preferences.')
}

function logCurrentUserHasOnlineAndInPerson() {
    logError(currentUserName + " has both online and in person as options")
}

function logCurrentUserHasOnlineInPrefferedMentoringOption() {
    logError(currentUserName + " has online as a preffered mentoring option")
}

function logCurrentUserHasInPersonAsPrefferedMentoringOption() {
    logError(currentUserName + " has in person as a preffered mentoring option")
}

function logPotentialMentorHasOnlineAndInPerson() {
    logError(potentialMentorUserName + " has both online and in person as options")
}

function logPotentialMentorHasOnlineInPrefferedMentoringOption() {
    logError(potentialMentorUserName + " has online as a preffered mentoring option")
}

function logPotentialMentorHasInPersonAsPrefferedMentoringOption() {
    logError(potentialMentorUserName + " has in person as a preffered mentoring option")
}

function logLocationInformaion() {
    logDebug("Current users location: " + currentUser.location + ' , Potential mentor: ' + potentialMentorUserName + ' location: ' + potentialMentor.location)
    logDebug("Current users maximum travel distance: " + currentUser.menteeSettings.maximumTravelDistanceKM + "KM")
    logDebug("Potential mentor: " + potentialMentorUserName + " maximum travel distance is: " + potentialMentor.mentorSettings.maximumTravelDistanceKM + "KM")
}

function logCurrentAreaOfInterestInformation() {
    logDebug("Attempting to match area of inteterest:( " + currentAreaOfInterest.value + " ), years of experience: " + currentAreaOfInterest.years)
}

function logPotentialMentorInformation(index) {
    logDebug("Comparing potential mentor " + potentialMentorUserName + " number: " + index)
}

function logNotExperiencedEnoughToMentorAreaOfInterest() {
    logDebug('Potential mentor: ' + potentialMentorUserName + 'is not experienced enough to mentor in: ' + comparisonAreaOfInterest.value +
        'as they only have ' + comparisonAreaOfInterest.years + ' experience compared to current users: ' + currentUser.userName + ' ' + currentAreaOfInterest.years +
        ' years of experience.')
}

function logAreaOfInterestWasNotAMatch() {
    logDebug('Potential mentor: ' + potentialMentorUserName + ' area of interest: ' + comparisonAreaOfInterest.value + ' was not a match with: ' + currentAreaOfInterest.value)
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
    logDebug("SHARED INTEREST: (" + currentAreaOfInterest.value + ") with potential mentor: " + potentialMentorUserName)
}

function logSuitableToMentor() {
    if (currentAreaOfInterest.years < comparisonAreaOfInterest.years) {
        var differenceInExperience = comparisonAreaOfInterest.years - currentAreaOfInterest.years
        logDebug('Potential mentor ' + potentialMentorUserName + " is suitable to mentor as they have " + comparisonAreaOfInterest.years + " years experience in " + comparisonAreaOfInterest.value +
            " which is a +" + differenceInExperience + " years difference.")
    } else {
        logDebug('Potential mentor ' + potentialMentorUserName + " is not suitable to mentor " + comparisonAreaOfInterest.value + ' as they have ' +
            comparisonAreaOfInterest.years + " years of experience, which is less than the " +
            currentAreaOfInterest.years + " experience the current user has")
    }
}

function logWantsAMentorFor(areasOfInterest) {
    var wantsAMentorFor = getValuesFromAreasOfInterest(areasOfInterest)
    logDebug("Wants a mentor for: " + JSON.stringify(wantsAMentorFor, null, 2))
}