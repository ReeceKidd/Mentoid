var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

module.exports = mentorMatch = (req, res) => {

    console.log('Attempting to get match info for: ' + req.body.userName)

    var undefinedFields = checkUndefinedFields(req.body, ['userName', 'mentorName'])

    if (undefinedFields) {
        logger.warn(undefinedFields)
        return res.status(950).send({
            error: 'Undefined field',
            message: undefinedFields
        })
    }

    //Checks if new username already exists in the database. 
    User.findOne({
        userName: req.body.userName
    }, function (err, user) {
        if (!user) {
            logger.debug('No users found with the username: ' + req.body.userName)
            res.status(700)
            res.send({
                message: 'Could not find user with username: ' + req.body.userName
            })
        } else if (err) {
            logger.debug(err)
            res.status(500)
            res.send({
                message: 'Server error',
                error: 'Server error'
            })
        } else {

            console.log('Found user: ' + user.userName)

            User.findOne({
                userName: req.body.mentorName
            }, function (err, mentor) {
                if (!mentor) {
                    logger.debug('No mentors found with the username: ' + req.body.mentorName)
                    res.status(700)
                    res.send({
                        message: 'Could not find mentor with username: ' + req.body.userName
                    })
                } else if (err) {
                    logger.debug(err)
                    res.status(500)
                    res.send({
                        message: 'Server error'
                    })
                } else {

                    console.log('Found mentor with name: ' + mentor.userName)
                    var otherInterests = getOtherInterests(user, mentor)
                    var languageMatches = getLanguagesMatch(user, mentor)
                    var mentorTooYoungBy = getMentorTooYoungBy(user, mentor)
                    var mentorTooOldBy = getMentorTooOldBy(user, mentor)
                    var currentUserTooYoungBy = getCurrentUserTooYoungBy(user, mentor)
                    var currentUserTooOldBy = getCurrentUserTooOldBy(user, mentor)
                    var updatedMentorEducation = getEducationPreferencesMatches(user, mentor)
                    var numberOfEducationMatches = getNumberOfEducationMatches(mentor)

                    res.status(200).send({
                        otherInterests: otherInterests,
                        languageMatches: languageMatches,
                        updatedMentorEducation: updatedMentorEducation,
                        numberOfEducationMatches: numberOfEducationMatches,
                        mentorTooYoungBy: mentorTooYoungBy,
                        mentorTooOldBy: mentorTooOldBy,
                        currentUserTooYoungBy: currentUserTooYoungBy,
                        currentUserTooOldBy: currentUserTooOldBy
                    })
                    //Get the info here. 

                }

            })
        }

    })
}

function removeDuplicates(arr, prop) {
    var obj = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
    }
    var newArr = [];
    for (var key in obj) newArr.push(obj[key]);
    return newArr;
}

function getOtherInterests(user, mentor) {
    let otherInterests = []
    mentor.areasOfInterest.forEach(mentorInterest => {
        user.areasOfInterest.forEach(userInterest => {
            logger.error('Current user interest: ' + userInterest.value + ' years: ' + userInterest.years)
            logger.error('Current mentor interest: ' + mentorInterest.value + ' years: ' + mentorInterest.years)
            if (mentorInterest.value !== userInterest.value) {
                logger.error('Not a match: ' + userInterest.value + ' with mentor interest: ' + mentorInterest.value)
                otherInterests.push({
                    value: mentorInterest.value,
                    years: mentorInterest.years
                })
            } else {
                logger.error('Match ignoring: ' + mentorInterest.value)
            }
        })

    })

    otherInterests = removeDuplicates(otherInterests, 'value')
    // Removes the duplicated has more experience value. 
    //Cant use mentor has more experience in need a better way to filter the array to only contain values that are not in the areas of interest. 

    logger.error('Number of other interests: ' + otherInterests.length)
    return otherInterests
}

function getMentorTooYoungBy(user, mentor) {
    logger.debug('Entering get mentor too young by method')
    logger.debug('Users minimum age for mentors: ' + user.menteeSettings.minimumAge)
    logger.debug('Mentors current age: ' + mentor.age)
    if (user.menteeSettings.minimumAge > mentor.age) {
        let mentorTooYoungBy = user.menteeSettings.minimumAge - mentor.age
        logger.debug(mentor.userName + ' is too young by: ' + mentorTooYoungBy + ' years. ')
        return mentorTooYoungBy
    } else {
        logger.debug('Mentor ' + mentor.userName + ' is older than the minimum age')
        return null
    }
}

function getMentorTooOldBy(user, mentor) {
    logger.debug('Entering get mentor too old by method')
    logger.debug('Users maximum age for mentors: ' + user.menteeSettings.maximumAge)
    logger.debug('Mentors current age: ' + mentor.age)
    if (mentor.age > user.mentorSettings.maximumAge) {
        let mentorTooOldBy = mentor.age - user.menteeSettings.maximumAge
        logger.debug(mentor.userName + ' is too old by ' + mentorTooOldBy + 'years. ')
        return mentorTooOldBy
    } else {
        logger.debug('Mentor ' + mentor.userName + ' is younger than the maximum age.')
        return null
    }
}

function getCurrentUserTooYoungBy(user, mentor) {
    logger.debug('Entering get current user too young by method')
    logger.debug('Mentor ' + mentor.userName + ' maximum age for mentors: ' + mentor.mentorSettings.maximumAge)
    logger.debug('Users current age: ' + user.age)
    if (user.age < mentor.mentorSettings.minimumAge) {
        let currentUserTooYoungBy = mentor.mentorSettings.minimumAge - user.age
        logger.debug('Current user is too young by: ' + currentUserTooYoungBy + ' number of years. ')
        return currentUserTooYoungBy
    } else {
        logger.debug('User is old enough for mentoring')
        return null
    }
}

function getCurrentUserTooOldBy(user, mentor) {
    logger.debug('Entering get current user too young by method')
    logger.debug('Mentor ' + mentor.userName + ' minimum age for mentors: ' + mentor.mentorSettings.minimumAge)
    logger.debug('Users current age: ' + user.age)
    if (mentor.mentorSettings.minimumAge > user.age) {
        let currentUserTooOldBy = user.age - mentor.mentorSettings.maximumAge
        logger.debug('Current user is too old by: ' + currentUserTooOldBy + ' number of years. ')
        mentor.currentUserTooOldBy = currentUserTooOldBy
    } else {
        logger.debug('User is in the mentors preffered range.')
        return null
    }
}

function getEducationPreferencesMatches(user, mentor) {
    updatedMentorEducation = []
    logger.debug('Checking current users education again mentors preferences')
    console.log('Users mentor preferences: ' + JSON.stringify(user.menteeSettings.prefferedEducation, null, 2))
    logger.debug('Potential mentor: ' + mentor.userName + ' mentoring education are: ' + mentor.mentorSettings.prefferedEducation)
    for(var x = 0; x < mentor.education.length; x++){

        mentor.education[x].isMatch = null

        for(var y = 0; y < user.menteeSettings.prefferedEducation.length; y++){

            console.log('Mentors education degree: ' + mentor.education[x].degree)
            console.log('Users education degree: ' + user.menteeSettings.prefferedEducation[y])
            
            if(mentor.education[x].degree == user.menteeSettings.prefferedEducation[y]){
                console.log('Match')
                console.log('Match for: ' + mentor.education[x].degree)
                mentor.education[x] = {
                    degree: mentor.education[x].degree,
                    country: mentor.education[x].country,
                    educationID: mentor.education[x].educationID,
                    endYear: mentor.education[x].endYear,
                    fieldOfStudy: mentor.education[x].fieldOfStudy,
                    school: mentor.education[x].school,
                    isMatch: true
                }
                console.log('Updated mentor education: ' + JSON.stringify(mentor.education[x], null, 2))

            } else {
                console.log('Not a match')
            }

        }


    }
    
    console.log('Updated mentor education: ' + JSON.stringify(mentor.education, null, 2))
    return mentor.education
}

function getNumberOfEducationMatches(mentor) {
    let numberOfEducationMatches = 0

    for(var x = 0; x < mentor.education.length; x++){
        if(mentor.education[x].isMatch){
            numberOfEducationMatches++
        }
    }

    return numberOfEducationMatches

}

function getLanguagesMatch(user, mentor) {
    let languageMatches = []
    logger.debug('Attempting language match with potential mentor: ' + mentor.userName)
    logger.debug('Current users languages are: ' + JSON.stringify(user.menteeSettings.languages))
    logger.debug('Potential mentor: ' + mentor.userName + ' mentoring languages are: ' + JSON.stringify(mentor.mentorSettings.languages))
    user.menteeSettings.languages.forEach(userLanguage => {
        mentor.mentorSettings.languages.forEach(mentorLanguage => {
            if (userLanguage === mentorLanguage) {
                languageMatches.push(userLanguage)
            }
        })
    })
    logger.debug('Potential mentor: ' + mentor.userName + ' language matches are: ' + JSON.stringify(languageMatches))
    mentor.numberOfLanguageMatches = languageMatches.length
    logger.debug('Potential mentor: ' + mentor.userName + ' number of language matches: ' + languageMatches.length)
    return languageMatches
}

function logAgeInformation(user, mentor) {
    let potentialMentorsNameMsg = 'Potential mentor: ' + mentor.userName
    logger.debug('Current users age: ' + user.age)
    logger.debug('Potential mentor age: ' + mentor.age)
    logger.debug('Users preferred minimum age of mentor: ' + user.menteeSettings.minimumAge)
    logger.debug('Users preferred maximum age of mentor: ' + user.menteeSettings.maximumAge)
    logger.debug('Potential mentors preffered minimum age of mentee ' + mentor.mentorSettings.minimumAge)
    logger.debug('Potential mentors preffered maximum age of mentee ' + mentor.mentorSettings.maximumAge)
}