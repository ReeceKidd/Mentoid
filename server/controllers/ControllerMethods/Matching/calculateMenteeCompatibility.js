var User = require('../../../models/user')

var logger = require('../../../src/logger.js')(module)

//Checks all necessary fields are defined. 
const checkUndefinedFields = require('../../UndefinedCheckers/nonArray')

module.exports = getCompatibility = (req, res) => {

    console.log('Attempting to get compatibility for user: ' + req.body.userName)

    var undefinedFields = checkUndefinedFields(req.body, ['userName', 'mentee'])

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
            let updatedMentee = generateSortingInformation(user, req.body.mentee)
            let compatibilityScore = getCompatibilityScore(user, updatedMentee)
            res.status(200).send({
                compatibilityScore: compatibilityScore
            })
        }

    })
}

function getCompatibilityScore(user, mentee) {

    console.log('Mentor SIMILAR INTERESTS: ' + mentee.similarInterests.length)
    console.log('Mentor has more experience in ' + mentee.mentorHasMoreExperience.length)
    var numberOfUserInterests = user.areasOfInterest.length
    var percentageForEachInterest = 100 / numberOfUserInterests
    var numberOfUserLanguages = user.menteeSettings.languages
    var percentageForEachLanguageMatch = 100 / numberOfUserLanguages
    console.log('Number of user interests: ' + numberOfUserInterests)

    var compatibilityScore = 0

    if(mentee.similarInterests.length > 0){
        console.log(mentee.userName + ' has similar interests')
        compatibilityScore += 10
    }

    if (mentee.mentorTooOldBy === null) {
        console.log(mentee.userName + ' is not too old')
        compatibilityScore += 10
    }

    if (mentee.mentorTooYoungBy === null) {
        console.log(mentee.userName + ' is not too young')
        compatibilityScore += 10
    }

    if(mentee.mentorHasMoreExperience.length > 1){
        console.log(mentee.userName + ' has more experience in multiple areas')
        compatibilityScore += 10
    }

    if (mentee.currentUserTooOldBy === null) {
        console.log('User is not too old for ' + mentee.userName)
        compatibilityScore += 10
    }

    if (mentee.currentUserTooYoungBy === null) {
        console.log('User is not too young for ' + mentee.userName)
        compatibilityScore += 10
    }

    if(user.menteeSettings.prefferedMentoringFormats.indexOf('In person') > -1){

        if(mentee.isWithinUsersRange){
            console.log(mentee.userName + ' is within users distance range')
            compatibilityScore += 10
        }

        if(mentee.userIsWithinMentorsRange){
            console.log('User is within mentee: ' + mentee.userName + ' range')
            compatibilityScore += 10
        }

    }
    
    return compatibilityScore

}

function generateSortingInformation(user, mentee) {
    mentee.mentorTooYoungBy = getMentorTooYoungBy(user, mentee)
    console.log('Mentor to young by: ' + mentee.mentorTooYoungBy)
    mentee.mentorTooOldBy = getMentorTooOldBy(user, mentee)
    console.log('Mentor too old by: ' + mentee.mentorTooOldBy)
    mentee.currentUserTooYoungBy = getCurrentUserTooYoungBy(user, mentee)
    console.log('Current user too young by: ' + mentee.currentUserTooYoungBy)
    mentee.currentUserTooOldBy = getCurrentUserTooOldBy(user, mentee)
    console.log('Current user to old by: ' + mentee.currentUserTooOldBy)
    logAgeInformation(user, mentee)
    mentee.educationMatches = getEducationPreferencesMatches(user, mentee)
    console.log('Education matches: ' + mentee.educationMatches.length)
    mentee.languageMatches = languagesMatch(user, mentee)
    console.log('Language matches: ' + mentee.languageMatches.length)
    return mentee
}

function ageMatch(user, mentee) {

    return mentee
}

function getMentorTooYoungBy(user, mentee) {
    if (user.menteeSettings.minimumAge < mentee.age) {
        let mentorTooYoungBy = mentee.age - user.menteeSettings.minimumAge
        logger.debug(mentee.userName + ' is too young by: ' + mentorTooYoungBy + ' years. ')
        return mentorTooYoungBy
    } else {
        return null
    }
}

function getMentorTooOldBy(user, mentee) {
    if (user.menteeSettings.maximumAge > mentee.age) {
        let mentorTooOldBy = mentee.age - user.menteeSettings.maximumAge
        logger.debug(mentee.userName + ' is too old by ' + mentorTooOldBy + 'years. ')
        return mentorTooOldBy
    } else {
        return null
    }
}

function getCurrentUserTooYoungBy(user, mentee) {
    if (mentee.mentorSettings.minimumAge < user.age) {
        let currentUserTooYoungBy = mentee.mentorSettings.minimumAge - user.age
        logger.debug('Current user is too young by: ' + currentUserTooYoungBy + ' number of years. ')
        return currentUserTooYoungBy
    } else {
        return null
    }
}

function getCurrentUserTooOldBy(user, mentee) {
    if (mentee.mentorSettings.maximumAge > user.age) {
        let currentUserTooOldBy = user.age - mentee.mentorSettings.maximumAge
        logger.debug('Current user is too old by: ' + currentUserTooOldBy + ' number of years. ')
        mentee.currentUserTooOldBy = currentUserTooOldBy
    } else {
        return null
    }
}

function getEducationPreferencesMatches(user, mentee) {
    let educationMatches = []
    logger.debug('Checking current users education again mentors preferences')
    logger.debug('Potential mentee: ' + mentee.userName + ' mentoring education are: ' + mentee.mentorSettings.prefferedEducation)
    user.education.forEach(educationChoice => {
        mentee.mentorSettings.prefferedEducation.forEach(prefferedEducationChoice => {
            if (educationChoice.degree === prefferedEducationChoice) {
                logger.debug(educationChoice.degree + ' is a match with ' + mentee.userName + ' preffered education level: ' + prefferedEducationChoice)
                educationMatches.push(prefferedEducationChoice)
            } else {
                logger.debug(mentee.userName + ' preffered education choice: ' + prefferedEducationChoice + ' was not a match with ' + educationChoice)
            }
        })
    })
    return educationMatches
    logger.debug('Number of education matches: ' + educationMatches.length)
}

function languagesMatch(user, mentee) {
    let languageMatches = []
    logger.debug('Attempting language match with potential mentee: ' + mentee.userName)
    logger.debug('Current users languages are: ' + JSON.stringify(user.menteeSettings.languages))
    logger.debug('Potential mentee: ' + mentee.userName + ' mentoring languages are: ' + JSON.stringify(mentee.mentorSettings.languages))
    user.menteeSettings.languages.forEach(userLanguage => {
        mentee.mentorSettings.languages.forEach(mentorLanguage => {
            if (userLanguage === mentorLanguage) {
                languageMatches.push(userLanguage)
            }
        })
    })
    logger.debug('Potential mentee: ' + mentee.userName + ' language matches are: ' + JSON.stringify(languageMatches))
    mentee.numberOfLanguageMatches = languageMatches.length
    logger.debug('Potential mentee: ' + mentee.userName + 'number of language matches: ' + languageMatches.length)
    return languageMatches
}

function logAgeInformation(user, mentee) {
    let potentialMentorsNameMsg = 'Potential mentee: ' + mentee.userName
    logger.debug('Current users age: ' + user.age)
    logger.debug('Potential mentee age: ' + mentee.age)
    logger.debug('Users preferred minimum age of mentee: ' + user.menteeSettings.minimumAge)
    logger.debug('Users preferred maximum age of mentee: ' + user.menteeSettings.maximumAge)
    logger.debug('Potential mentors preffered minimum age of mentee ' + mentee.mentorSettings.minimumAge)
    logger.debug('Potential mentors preffered maximum age of mentee ' + mentee.mentorSettings.maximumAge)
}