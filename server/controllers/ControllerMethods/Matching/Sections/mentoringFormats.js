//This method determines viable users based on the users mentoring preferences. 

var User = require('../../../../models/user')
var logger = require('../../../../src/logger.js')(module)
var matchingLogger = require('../../../../src/Loggers/matchingLogger.js')(module)

//This method determines what search path to follow based on the users mentoring formats preferences. 
module.exports = function mentoringFormatNavigator(prefferedMentoringFormat) {
    var prefferedMentoringFormatQuery
    logDebug('Mentee preferences: ' + JSON.stringify(prefferedMentoringFormat))
    logDebug('Preffered mentoring format length: ' + prefferedMentoringFormat.length)

    if (prefferedMentoringFormat.length === 1) {
        if (prefferedMentoringFormat[0] === 'In person') {
            prefferedMentoringFormatQuery = inPersonSearch()
        } else if (prefferedMentoringFormat[0] === 'Online') {
            prefferedMentoringFormatQuery = onlineSearch()
        }
    } else {
        //Returns all users as user has no preferences. 
        prefferedMentoringFormatQuery = inPersonAndOnline()
    }
   
    logDebug('Preferred mentoring format query: ' + prefferedMentoringFormatQuery)
    return prefferedMentoringFormatQuery

}

function inPersonSearch() {
    return ['In person']
}

function onlineSearch() {
   return ['Online']
}

function inPersonAndOnline() {
    return ['Online', 'In person']
}

function logError(errorMessage) {
    logger.error(errorMessage)
    matchingLogger.error(errorMessage)
}

function logDebug(debugMessage) {
    logger.error(debugMessage)
    matchingLogger.error(debugMessage)
}

