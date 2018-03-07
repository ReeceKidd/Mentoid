const manageRelationshipsController = {}

//Get methods
manageRelationshipsController.getManageRelationships = require('./ControllerMethods/ManageRelationships/Get/getManageRelationships')
manageRelationshipsController.getMentees = require('./ControllerMethods/ManageRelationships/Get/getCurrentMentees')
manageRelationshipsController.getMentors = require('./ControllerMethods/ManageRelationships/Get/getCurrentMentors')
manageRelationshipsController.getPotentialMentees = require('./ControllerMethods/ManageRelationships/Get/getPotentialMentees')
manageRelationshipsController.getPotentialMentors = require('./ControllerMethods/ManageRelationships/Get/getPotentialMentors')
manageRelationshipsController.getPastMentees = require('./ControllerMethods/ManageRelationships/Get/getPastMentees')
manageRelationshipsController.getPastMentors = require('./ControllerMethods/ManageRelationships/Get/getPastMentors')


//Mentee methods
manageRelationshipsController.endRelationshipWithMentee = require('./ControllerMethods/ManageRelationships/Mentee/endRelationshipWithMentee')

// //Mentor methods
// manageRelationshipsController.endRelationshipWithMentor = require('./ControllerMethods/ManageRelationships/Mentor/endRelationshipWithMentor')

//Potential Mentee Methods 
manageRelationshipsController.acceptPotentialMentee = require('./ControllerMethods/ManageRelationships/PotentialMentee/acceptPotentialMentee')
manageRelationshipsController.deletePotentialMentee = require('./ControllerMethods/ManageRelationships/PotentialMentee/deletePotentialMentee')

// //Potential Mentor Methods
// manageRelationshipsController.acceptPotentialMentor = require('./ControllerMethods/ManageRelationships/PastMentor/acceptPotentialMentor')
// manageRelationshipsController.deletePotentialMentor = require('./ControllerMethods/ManageRelationships/PotentialMentor/deletePotentialMentor')


module.exports = manageRelationshipsController;