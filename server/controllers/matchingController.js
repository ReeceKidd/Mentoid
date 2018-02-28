const matchingController = {}

//Matching Controller Methods. 
matchingController.getPotentialMentors = require('./ControllerMethods/Matching/getPotentialMentors')
matchingController.applyForMentorship = require('./ControllerMethods/Matching/applyForMentorship')
matchingController.getManageRelationships = require('./ControllerMethods/Matching/getManageRelationships')
matchingController.acceptPotentialMentee = require('./ControllerMethods/Matching/acceptPotentialMentee')
//matchingController.acceptPotentialMentor
//matchingController.deletePotentialMentee
//matchingController.deletePotentialMentor


module.exports = matchingController