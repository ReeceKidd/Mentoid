const matchingController = {}

//Matching Controller Methods. 
matchingController.getPotentialMentors = require('./ControllerMethods/Matching/getPotentialMentors')
matchingController.getPotentialMentees = require('./ControllerMethods/Matching/getPotentialMentees')
matchingController.calculateMentorCompatibility = require('./ControllerMethods/Matching/calculateMentorCompatibility')
matchingController.calculateMenteeCompatibility = require('./ControllerMethods/Matching/calculateMenteeCompatibility')
matchingController.mentorMatch = require('./ControllerMethods/Matching/mentorMatch')
matchingController.applyForMentorship = require('./ControllerMethods/Matching/applyForMentorship')

module.exports = matchingController