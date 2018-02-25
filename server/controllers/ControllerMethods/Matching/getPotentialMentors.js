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

//Arrays for storing similar interests. 
let mentorHasLessExperience = []
let mentorHasMoreExperience = []
let mentorHasSameExperience = []


let potentialMentors = []
let filteredPotentialMentors = []
let onlineMentors = []
let inPersonMentors = []

module.exports = getPotentialMentors = (req, res) => {

    var undefinedFields = checkUndefinedFields(req.params, ['userID', 'userName'])

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
            },
            {
                $match: {
                    "mentorSettings.languages": languages
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

                logError("Number of potential mentors: " + potentialMentors.length)

                potentialMentors.forEach(function (currentPotentialMentor, index) {

                    resetSimilarInterests()

                    potentialMentor = currentPotentialMentor
                    potentialMentorUserName = potentialMentor.userName

                    logPotentialMentorInformation(index)
                    deleteUnnecessaryInformation(potentialMentor)

                    currentUser.areasOfInterest.forEach(function (retrievedAreaOfInterest) {

                        currentAreaOfInterest = retrievedAreaOfInterest

                        logCurrentAreaOfInterestInformation()

                        potentialMentor.mentorSettings.areasOfInterest.forEach(function (areaOfInterestToCompare) {

                            comparisonAreaOfInterest = areaOfInterestToCompare

                            if (currentAreaOfInterest.value === comparisonAreaOfInterest.value) {
                                logAppropriateSimilarInterestMessage()
                                populateSharedInterestObject()

                                if (comparisonAreaOfInterest.years > currentAreaOfInterest.years) {
                                    organizeByMentoringFormat()
                                    filteredPotentialMentors.push(currentPotentialMentor)

                                } else {
                                    logNotExperiencedEnoughToMentorAreaOfInterest()
                                }
                            } else {
                                logAreaOfInterestWasNotAMatch()
                            }

                        })


                    });

                    generateSortingInformation()
                    addSimilarInterestsFieldToPotentialMentor()
                    setNumberOfSharedInterests()
                    logDebug(JSON.stringify(potentialMentor.educationMatches))
                });

                logDebug('Number of matched online mentors: ' + onlineMentors.length)
                logDebug('Number of matched in person mentors: ' + inPersonMentors.length)
                logDebug('Starting number of potential mentors: ' + potentialMentors.length)
                logDebug('Number of filtered potential mentors: ' + filteredPotentialMentors.length)

                res.status(200).send({
                    potentialMentors: filteredPotentialMentors
                })

            }
        })
    })
}

//This covers every possible combination of the two values in order to sort the information properly. 
function organizeByMentoringFormat() {

    if (currentUser.menteeSettings.prefferedMentoringFormats.length > 1) {
        logCurrentUserHasOnlineAndInPerson()

        if (potentialMentor.mentorSettings.prefferedMentoringFormats.length > 1) {
            logPotentialMentorHasOnlineAndInPerson()
            logBothUsersHaveOnlineAndInPerson()
            addMentorToOnlineList()
            addMentorToInPersonList()
        } else if (potentialMentor.mentorSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
            logPotentialMentorHasInPersonAsPrefferedMentoringOption()
            addMentorToInPersonList()
        } else if (potentialMentor.mentorSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
            logPotentialMentorHasOnlineInPrefferedMentoringOption()
            addMentorToOnlineList()
        }

    } else if (currentUser.menteeSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
        if (potentialMentor.mentorSettings.prefferedMentoringFormats.length > 1) {
            logPotentialMentorHasOnlineAndInPerson()
            addMentorToOnlineList()
            addMentorToInPersonList()
        } else if (potentialMentor.mentorSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
            logPotentialMentorHasInPersonAsPrefferedMentoringOption()
            logMentorPreferenceNotSuitable()
            addMentorToInPersonList()
        } else if (potentialMentor.mentorSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
            logPotentialMentorHasOnlineInPrefferedMentoringOption()
            addMentorToOnlineList()
        }

    } else if (currentUser.menteeSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
        if (potentialMentor.mentorSettings.prefferedMentoringFormats.length > 1) {
            logPotentialMentorHasOnlineAndInPerson()
            addMentorToOnlineList()
            addMentorToInPersonList()
        } else if (potentialMentor.mentorSettings.prefferedMentoringFormats.indexOf('In person') > -1) {
            logPotentialMentorHasInPersonAsPrefferedMentoringOption()
            addMentorToInPersonList()
        } else if (potentialMentor.mentorSettings.prefferedMentoringFormats.indexOf('Online') > -1) {
            logPotentialMentorHasOnlineInPrefferedMentoringOption()
            logMentorPreferenceNotSuitable()
            addMentorToOnlineList()
        }
    }

}

function resetSimilarInterests() {
    mentorHasMoreExperience = []
    mentorHasLessExperience = []
    mentorHasSameExperience = []
}

function distanceSorter() {

    let distance = getDistanceFromPotentialMentor()
    logLocationInformaion()
    if (distance < currentUser.maximumTravelDistanceKM) {
        logWithinUsersRange()

        if (distance < potentialMentor.maximumTravelDistanceKM) {
            logWithinMentorsRange()

        } else {
            logOutsideOfMentorsRange()
        }
    } else {
        logOutsideOfUsersRange()
    }
}

function generateSortingInformation() {

    educationMatch()
    languagesMatch()
    ageMatch()

}

function ageMatch() {
    potentialMentor.isCurrentUserTooOld = isCurrentUserTooOld()
    potentialMentor.isCurrentUserTooYoung = isCurrentUserTooYoung()
    potentialMentor.isMentorTooOld = isMentorTooOld()
    potentialMentor.isMentorTooYoung = isMentorTooYoung()
    logAgeInformation()
}

function addSimilarInterestsFieldToPotentialMentor() {
    potentialMentor.hasMoreExperienceIn = mentorHasMoreExperience
    potentialMentor.hasLessExperienceIn = mentorHasLessExperience
    potentialMentor.hasSameExperienceIn = mentorHasSameExperience
}

function addMentorToOnlineList() {
    onlineMentors.push(potentialMentor)
    logError('Potential mentor: ' + potentialMentorUserName + ' has been added to the online list of mentors.')
}

function addMentorToInPersonList() {
    inPersonMentors.push(potentialMentor)
    logError('Potential mentor: ' + potentialMentorUserName + ' has been added to the in person list of mentors.')
}

function educationMatch() {
    let educationMatches = []
    logDebug('Attempting education match with potential mentor: ' + potentialMentorUserName)
    logDebug('Current users education preferences: ' + JSON.stringify(currentUser.menteeSettings.prefferedEducation))
    logDebug('Potential mentor: ' + potentialMentorUserName + ' education preferences: ' + JSON.stringify(potentialMentor.mentorSettings.prefferedEducation))
    currentUser.menteeSettings.prefferedEducation.forEach(currentUserEducation => {
        potentialMentor.mentorSettings.prefferedEducation.forEach(mentorEducation => {
            if (currentUserEducation === mentorEducation) {
                educationMatches.push(currentUserEducation)
            }
        })
    })
    potentialMentor.educationMatches = educationMatches
    logDebug('Potential mentor: ' + potentialMentorUserName + ' education matches are: ' + JSON.stringify(educationMatches))
    potentialMentor.numberOfEducationMatches = educationMatches.length
    logDebug('Potential mentor: ' + potentialMentorUserName + 'number of education matches: ' + educationMatches.length)
}

function languagesMatch() {
    let languageMatches = []
    logDebug('Attempting language match with potential mentor: ' + potentialMentorUserName)
    logDebug('Current users languages are: ' + JSON.stringify(currentUser.menteeSettings.languages))
    logDebug('Potential mentor: ' + potentialMentorUserName + ' mentoring languages are: ' + JSON.stringify(potentialMentor.mentorSettings.languages))
    currentUser.menteeSettings.languages.forEach(userLanguage => {
        potentialMentor.mentorSettings.languages.forEach(mentorLanguage => {
            if (userLanguage === mentorLanguage) {
                languageMatches.push(userLanguage)
            }
        })
    })
    potentialMentor.languageMatches = languageMatches
    logDebug('Potential mentor: ' + potentialMentorUserName + ' language matches are: ' + JSON.stringify(languageMatches))
    potentialMentor.numberOfEducationMatches = languageMatches.length
    logDebug('Potential mentor: ' + potentialMentorUserName + 'number of language matches: ' + languageMatches.length)
}

function populateSharedInterestObject() {

    if (comparisonAreaOfInterest.years > currentAreaOfInterest.years) {
        var differenceInExperience = comparisonAreaOfInterest.years - currentAreaOfInterest.years

        mentorHasMoreExperience.push({
            value: comparisonAreaOfInterest.value,
            yearsOfExperience: comparisonAreaOfInterest.years,
            differenceInExperience: differenceInExperience
        })
    } else if (comparisonAreaOfInterest.years < currentAreaOfInterest.years) {
        var differenceInExperience = currentAreaOfInterest.years - comparisonAreaOfInterest.years
        mentorHasLessExperience.push({
            value: comparisonAreaOfInterest.value,
            yearsOfExperience: comparisonAreaOfInterest.years,
            differenceInExperience: differenceInExperience
        })
    } else {
        mentorHasSameExperience.push({
            value: comparisonAreaOfInterest.value,
            yearsOfExperience: comparisonAreaOfInterest.years,
            differenceInExperience: 0
        })
    }

}

function deleteUnnecessaryInformation() {
    delete potentialMentor.password
    delete potentialMentor.confirmPassword
    delete potentialMentor.terms
}

//Getters. 

function setNumberOfSharedInterests() {
    potentialMentor.sharedNumberOfSharedInterests = mentorHasLessExperience.length + mentorHasMoreExperience.length + mentorHasSameExperience.length
}

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

function isMentorTooYoung() {
    if (currentUser.menteeSettings.minimumAge < potentialMentor.age) {
        return false
    }
    return true
}

function isMentorTooOld() {
    if (currentUser.menteeSettings.maximumAge > potentialMentor.age) {
        return false
    }
    return true
}

function isCurrentUserTooYoung() {
    if (potentialMentor.mentorSettings.minimumAge < currentUser.age) {
        return false
    }
    return true
}

function isCurrentUserTooOld() {
    if (potentialMentor.mentorSettings.maximumAge > currentUser.age) {
        return false
    }
    return true
}

//Handle logging for the matching section. 

function logAgeInformation() {
    let potentialMentorsNameMsg = 'Potential mentor: ' + potentialMentorUserName
    logDebug('Current users age: ' + currentUser.age)
    logDebug('Potential mentor age: ' + potentialMentor.age)
    logDebug('Users preferred minimum age of mentor: ' + currentUser.menteeSettings.minimumAge)
    logDebug('Users preferred maximum age of mentor: ' + currentUser.menteeSettings.maximumAge)
    logDebug('Potential mentors preffered minimum age of mentee ' + potentialMentor.mentorSettings.minimumAge)
    logDebug('Potential mentors preffered maximum age of mentee ' + potentialMentor.mentorSettings.maximumAge)
    if (isMentorTooYoung()) {
        logDebug(potentialMentorsNameMsg + ' is younger than users minimum age:' + currentUser.menteeSettings.minimumAge)
    }
    if (isMentorTooOld()) {
        logDebug(potentialMentorsNameMsg + ' is older than users maximum age: ' + currentUser.menteeSettings.maximumAge)
    }
    if (isCurrentUserTooOld()) {
        logDebug('User is older than ' + potentialMentorsNameMsg + "'s maximum age: " + potentialMentor.mentorSettings.minimumAge)
    }
    if (isCurrentUserTooYoung()) {
        logDebug('User is younger than ' + potentialMentorsNameMsg + "'s minimum age: " + potentialMentor.mentorSettings.maximumAge)
    }
}

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