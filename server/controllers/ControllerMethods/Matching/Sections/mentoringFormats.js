//This method determines viable users based on the users mentoring preferences. 

var User = require('../../../../models/user')

//This method determines what search path to follow based on the users mentoring formats preferences. 
module.exports = function mentoringFormatNavigator(prefferedMentoringFormat) {
    var prefferedMentoringFormatQuery
    console.log('Mentee preferences: ' + prefferedMentoringFormat.toString())
    if (prefferedMentoringFormat.length === 1) {
        console.log('Length is 1')
        if (prefferedMentoringFormat[0] === 'In person') {
            console.log('Entered in person method.')
            prefferedMentoringFormatQuery = inPersonSearch()
        } else if (prefferedMentoringFormat[0] === 'Online') {
            prefferedMentoringFormatQuery = onlineSearch()
        }
    } else {
        //Returns all users as user has no preferences. 
        prefferedMentoringFormatQuery = inPersonAndOnline()
    }
   
    console.log('Preferred mentoring format query: ' + prefferedMentoringFormatQuery)
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

