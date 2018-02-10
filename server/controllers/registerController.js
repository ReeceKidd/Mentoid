const registerController = {}

//Register Controller Methods. 
registerController.checkUserName = require('./ControllerMethods/Register/checkUserName.js')
registerController.checkEmail = require('./ControllerMethods/Register/checkEmail.js')
registerController.register = require('./ControllerMethods/Register/register')
registerController.getBasicRegistration = require('./ControllerMethods/Register/getBasicRegistration')
registerController.getAreasOfInterest = require('./ControllerMethods/Register/getAreasOfInterest')
registerController.getAreasOfInterestNames = require('./ControllerMethods/Register/getAreasOfInterestNames')
registerController.getUsersAge = require('./ControllerMethods/Register/getUsersAge')
registerController.updateAreasOfInterest = require('./ControllerMethods/Register/updateAreasOfInterest')
registerController.updateJobHistory = require('./ControllerMethods/Register/updateJobHistory')
registerController.updateEducation = require('./ControllerMethods/Register/updateEducation')
registerController.uploadProfilePicture = require('./ControllerMethods/Register/uploadProfilePicture')
registerController.getProfilePicture = require('./ControllerMethods/Register/getProfilePicture')
registerController.updateMentorPreferences = require('./ControllerMethods/Register/updateMentorPreferences')
registerController.getProfileCompleteness = require('./ControllerMethods/Register/getProfileCompleteness')
registerController.updateSocialMedia = require('./ControllerMethods/Register/updateSocialMedia')
registerController.getSocialMedia = require('./ControllerMethods/Register/getSocialMedia')

module.exports = registerController