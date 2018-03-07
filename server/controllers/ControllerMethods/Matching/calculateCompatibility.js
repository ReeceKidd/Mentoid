var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

module.exports = getCompatibility = (req, res) => {

    //Need to put the field checkers in. 

    var undefinedFields = checkUndefinedFields(req.body, ['userName', 'mentor'])

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
            res.status(600)
            res.send({
                message: 'Could not find user with username: ' + req.body.userName
            })
        } else if (err) {
            logger.error(err)
            res.status(500)
            res.send({
                message: 'Server error',
                error: 'Server error'
            })
        } else {
            let updatedMentor = generateSortingInformation(user, req.body.mentor)
            let compatibilityScore = getCompatibilityScore(user, updatedMentor)
            res.status(200).send({
                compatibilityScore: compatibilityScore
            })
        }

    })
}

function getCompatibilityScore(user, mentor) {

    console.log('Mentor SIMILAR INTERESTS: ' + mentor.similarInterests.length)
    console.log('Mentor has more experience in ' + mentor.mentorHasMoreExperience.length)
    var numberOfUserInterests = user.areasOfInterest.length
    var percentageForEachInterest = 100 / numberOfUserInterests
    var numberOfUserLanguages = user.menteeSettings.languages
    var percentageForEachLanguageMatch = 100 / numberOfUserLanguages
    console.log('Number of user interests: ' + numberOfUserInterests)

    var compatibilityScore = 0

    if(mentor.similarInterests.length > 0){
        compatibilityScore += 10
    }

    if (mentor.mentorTooOldBy === null) {
        compatibilityScore += 10
    }

    if (mentor.mentorTooYoungBy === null) {
        compatibilityScore += 10
    }

    if(mentor.mentorHasMoreExperience.length > 1){
        compatibilityScore += 10
    }

    if (mentor.currentUserTooOldBy === null) {
        compatibilityScore += 10
    }

    if (mentor.currentUserTooYoungBy === null) {
        compatibilityScore += 10
    }

    if (mentor.educationMatches.length > 0) {
        compatibilityScore += 10
    }

    if(user.menteeSettings.prefferedMentoringFormats.indexOf('In person') > -1){

        if(potentialMentor.isWithinUsersRange === false){
            compatibilityScore -= 10
        }

        if(potentialMentor.userIsWithinMentorsRange === false){
            compatibilityScore -= 10
        }

    }
    
    return compatibilityScore

}

function generateSortingInformation(user, mentor) {
    mentor.mentorTooYoungBy = getMentorTooYoungBy(user, mentor)
    console.log('Mentor to young by: ' + mentor.mentorTooYoungBy)
    mentor.mentorTooOldBy = getMentorTooOldBy(user, mentor)
    console.log('Mentor too old by: ' + mentor.mentorTooOldBy)
    mentor.currentUserTooYoungBy = getCurrentUserTooYoungBy(user, mentor)
    console.log('Current user too young by: ' + mentor.currentUserTooYoungBy)
    mentor.currentUserTooOldBy = getCurrentUserTooOldBy(user, mentor)
    console.log('Current user to old by: ' + mentor.currentUserTooOldBy)
    logAgeInformation(user, mentor)
    mentor.educationMatches = getEducationPreferencesMatches(user, mentor)
    console.log('Education matches: ' + mentor.educationMatches.length)
    mentor.languageMatches = languagesMatch(user, mentor)
    console.log('Language matches: ' + mentor.languageMatches.length)
    return mentor
}

function ageMatch(user, mentor) {

    return mentor
}

function getMentorTooYoungBy(user, mentor) {
    if (user.menteeSettings.minimumAge < mentor.age) {
        let mentorTooYoungBy = mentor.age - user.menteeSettings.minimumAge
        logger.error(mentor.userName + ' is too young by: ' + mentorTooYoungBy + ' years. ')
        return mentorTooYoungBy
    } else {
        return null
    }
}

function getMentorTooOldBy(user, mentor) {
    if (user.menteeSettings.maximumAge > mentor.age) {
        let mentorTooOldBy = mentor.age - user.menteeSettings.maximumAge
        logger.error(mentor.userName + ' is too old by ' + mentorTooOldBy + 'years. ')
        return mentorTooOldBy
    } else {
        return null
    }
}

function getCurrentUserTooYoungBy(user, mentor) {
    if (mentor.mentorSettings.minimumAge < user.age) {
        let currentUserTooYoungBy = mentor.mentorSettings.minimumAge - user.age
        logger.error('Current user is too young by: ' + currentUserTooYoungBy + ' number of years. ')
        return currentUserTooYoungBy
    } else {
        return null
    }
}

function getCurrentUserTooOldBy(user, mentor) {
    if (mentor.mentorSettings.maximumAge > user.age) {
        let currentUserTooOldBy = user.age - mentor.mentorSettings.maximumAge
        logger.error('Current user is too old by: ' + currentUserTooOldBy + ' number of years. ')
        mentor.currentUserTooOldBy = currentUserTooOldBy
    } else {
        return null
    }
}

function getEducationPreferencesMatches(user, mentor) {
    let educationMatches = []
    logger.error('Checking current users education again mentors preferences')
    logger.error('Potential mentor: ' + mentor.userName + ' mentoring education are: ' + mentor.mentorSettings.prefferedEducation)
    user.education.forEach(educationChoice => {
        mentor.mentorSettings.prefferedEducation.forEach(prefferedEducationChoice => {
            if (educationChoice.degree === prefferedEducationChoice) {
                logger.error(educationChoice.degree + ' is a match with ' + mentor.userName + ' preffered education level: ' + prefferedEducationChoice)
                educationMatches.push(prefferedEducationChoice)
            } else {
                logger.error(mentor.userName + ' preffered education choice: ' + prefferedEducationChoice + ' was not a match with ' + educationChoice)
            }
        })
    })
    return educationMatches
    logger.error('Number of education matches: ' + educationMatches.length)
}

function languagesMatch(user, mentor) {
    let languageMatches = []
    logger.error('Attempting language match with potential mentor: ' + mentor.userName)
    logger.error('Current users languages are: ' + JSON.stringify(user.menteeSettings.languages))
    logger.error('Potential mentor: ' + mentor.userName + ' mentoring languages are: ' + JSON.stringify(mentor.mentorSettings.languages))
    user.menteeSettings.languages.forEach(userLanguage => {
        mentor.mentorSettings.languages.forEach(mentorLanguage => {
            if (userLanguage === mentorLanguage) {
                languageMatches.push(userLanguage)
            }
        })
    })
    logger.error('Potential mentor: ' + mentor.userName + ' language matches are: ' + JSON.stringify(languageMatches))
    mentor.numberOfLanguageMatches = languageMatches.length
    logger.error('Potential mentor: ' + mentor.userName + 'number of language matches: ' + languageMatches.length)
    return languageMatches
}

function logAgeInformation(user, mentor) {
    let potentialMentorsNameMsg = 'Potential mentor: ' + mentor.userName
    logger.error('Current users age: ' + user.age)
    logger.error('Potential mentor age: ' + mentor.age)
    logger.error('Users preferred minimum age of mentor: ' + user.menteeSettings.minimumAge)
    logger.error('Users preferred maximum age of mentor: ' + user.menteeSettings.maximumAge)
    logger.error('Potential mentors preffered minimum age of mentee ' + mentor.mentorSettings.minimumAge)
    logger.error('Potential mentors preffered maximum age of mentee ' + mentor.mentorSettings.maximumAge)
}