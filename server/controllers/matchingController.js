const matchingController = {}

//Matching Controller Methods. 
matchingController.getPotentialMentors = require('./ControllerMethods/Matching/getPotentialMentors')
matchingController.applyForMentorship = require('./ControllerMethods/Matching/applyForMentorship')

module.exports = matchingController