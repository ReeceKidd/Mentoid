const matchingController = {}

//Matching Controller Methods. 
matchingController.getPotentialMentors = require('./ControllerMethods/Matching/getPotentialMentors')
matchingController.getPotentialMentees = require('./ControllerMethods/Matching/getPotentialMentees')
matchingController.calculateCompatibility = require('./ControllerMethods/Matching/calculateCompatibility')
matchingController.mentorMatch = require('./ControllerMethods/Matching/mentorMatch')
matchingController.applyForMentorship = require('./ControllerMethods/Matching/applyForMentorship')

module.exports = matchingController