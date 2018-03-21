var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

module.exports = getCompatibility = (req, res) => {

    console.log('Attempting to get compatibility for user: ' + req.body.userName)

    var undefinedFields = checkUndefinedFields(req.body, ['userName', 'match'])

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
            let updatedMentor = generateSortingInformation(user, req.body.match)
            let compatibilityScore = getCompatibilityScore(user, updatedMentor)
            res.status(200).send({
                compatibilityScore: compatibilityScore
            })
        }

    })
}

function getCompatibilityScore(user, match) {

    console.log('Mentor SIMILAR INTERESTS: ' + match.similarInterests.length)
    console.log('Mentor has more experience in ' + match.mentorHasMoreExperience.length)
    var numberOfUserInterests = user.areasOfInterest.length
    var percentageForEachInterest = 100 / numberOfUserInterests
    var numberOfUserLanguages = user.menteeSettings.languages
    var percentageForEachLanguageMatch = 100 / numberOfUserLanguages
    console.log('Number of user interests: ' + numberOfUserInterests)

    var compatibilityScore = 0

    if(match.similarInterests.length > 0){
        console.log(match.userName + ' has similar interests')
        compatibilityScore += 10
    }

    if (match.matchTooOldBy === null) {
        console.log(match.userName + ' is not too old')
        compatibilityScore += 10
    }

    if (match.matchTooYoungBy === null) {
        console.log(match.userName + ' is not too young')
        compatibilityScore += 10
    }

    if(match.mentorHasMoreExperience.length > 1){
        console.log(match.userName + ' has more experience in multiple areas')
        compatibilityScore += 10
    }

    if (match.currentUserTooOldBy === null) {
        console.log('User is not too old for ' + match.userName)
        compatibilityScore += 10
    }

    if (match.currentUserTooYoungBy === null) {
        console.log('User is not too young for ' + match.userName)
        compatibilityScore += 10
    }

    if(user.menteeSettings.prefferedMentoringFormats.indexOf('In person') > -1){

        if(match.isWithinUsersRange){
            console.log(match.userName + ' is within users distance range')
            compatibilityScore += 10
        }

        if(match.userIsWithinMentorsRange){
            console.log('User is within match: ' + match.userName + ' range')
            compatibilityScore += 10
        }

    }
    
    return compatibilityScore

}

function generateSortingInformation(user, match) {
    match.matchTooYoungBy = getMentorTooYoungBy(user, match)
    console.log('Mentor to young by: ' + match.matchTooYoungBy)
    match.matchTooOldBy = getMentorTooOldBy(user, match)
    console.log('Mentor too old by: ' + match.matchTooOldBy)
    match.currentUserTooYoungBy = getCurrentUserTooYoungBy(user, match)
    console.log('Current user too young by: ' + match.currentUserTooYoungBy)
    match.currentUserTooOldBy = getCurrentUserTooOldBy(user, match)
    console.log('Current user to old by: ' + match.currentUserTooOldBy)
    logAgeInformation(user, match)
    match.educationMatches = getEducationPreferencesMatches(user, match)
    console.log('Education matches: ' + match.educationMatches.length)
    match.languageMatches = languagesMatch(user, match)
    console.log('Language matches: ' + match.languageMatches.length)
    return match
}

function ageMatch(user, match) {

    return match
}

function getMentorTooYoungBy(user, match) {
    if (user.menteeSettings.minimumAge < match.age) {
        let matchTooYoungBy = match.age - user.menteeSettings.minimumAge
        logger.debug(match.userName + ' is too young by: ' + matchTooYoungBy + ' years. ')
        return matchTooYoungBy
    } else {
        return null
    }
}

function getMentorTooOldBy(user, match) {
    if (user.menteeSettings.maximumAge > match.age) {
        let matchTooOldBy = match.age - user.menteeSettings.maximumAge
        logger.debug(match.userName + ' is too old by ' + matchTooOldBy + 'years. ')
        return matchTooOldBy
    } else {
        return null
    }
}

function getCurrentUserTooYoungBy(user, match) {
    if (match.mentorSettings.minimumAge < user.age) {
        let currentUserTooYoungBy = match.mentorSettings.minimumAge - user.age
        logger.debug('Current user is too young by: ' + currentUserTooYoungBy + ' number of years. ')
        return currentUserTooYoungBy
    } else {
        return null
    }
}

function getCurrentUserTooOldBy(user, match) {
    if (match.mentorSettings.maximumAge > user.age) {
        let currentUserTooOldBy = user.age - match.mentorSettings.maximumAge
        logger.debug('Current user is too old by: ' + currentUserTooOldBy + ' number of years. ')
        match.currentUserTooOldBy = currentUserTooOldBy
    } else {
        return null
    }
}

function getEducationPreferencesMatches(user, match) {
    let educationMatches = []
    logger.debug('Checking current users education again mentors preferences')
    logger.debug('Potential match: ' + match.userName + ' mentoring education are: ' + match.mentorSettings.prefferedEducation)
    user.education.forEach(educationChoice => {
        match.mentorSettings.prefferedEducation.forEach(prefferedEducationChoice => {
            if (educationChoice.degree === prefferedEducationChoice) {
                logger.debug(educationChoice.degree + ' is a match with ' + match.userName + ' preffered education level: ' + prefferedEducationChoice)
                educationMatches.push(prefferedEducationChoice)
            } else {
                logger.debug(match.userName + ' preffered education choice: ' + prefferedEducationChoice + ' was not a match with ' + educationChoice)
            }
        })
    })
    return educationMatches
    logger.debug('Number of education matches: ' + educationMatches.length)
}

function languagesMatch(user, match) {
    let languageMatches = []
    logger.debug('Attempting language match with potential match: ' + match.userName)
    logger.debug('Current users languages are: ' + JSON.stringify(user.menteeSettings.languages))
    logger.debug('Potential match: ' + match.userName + ' mentoring languages are: ' + JSON.stringify(match.mentorSettings.languages))
    user.menteeSettings.languages.forEach(userLanguage => {
        match.mentorSettings.languages.forEach(mentorLanguage => {
            if (userLanguage === mentorLanguage) {
                languageMatches.push(userLanguage)
            }
        })
    })
    logger.debug('Potential match: ' + match.userName + ' language matches are: ' + JSON.stringify(languageMatches))
    match.numberOfLanguageMatches = languageMatches.length
    logger.debug('Potential match: ' + match.userName + 'number of language matches: ' + languageMatches.length)
    return languageMatches
}

function logAgeInformation(user, match) {
    let potentialMentorsNameMsg = 'Potential match: ' + match.userName
    logger.debug('Current users age: ' + user.age)
    logger.debug('Potential match age: ' + match.age)
    logger.debug('Users preferred minimum age of match: ' + user.menteeSettings.minimumAge)
    logger.debug('Users preferred maximum age of match: ' + user.menteeSettings.maximumAge)
    logger.debug('Potential mentors preffered minimum age of mentee ' + match.mentorSettings.minimumAge)
    logger.debug('Potential mentors preffered maximum age of mentee ' + match.mentorSettings.maximumAge)
}