const registerController = {}

//Register Controller Methods. 
registerController.checkUserName = require('./ControllerMethods/Register/checkUserName.js')
registerController.checkEmail = require('./ControllerMethods/Register/checkEmail.js')
registerController.register = require('./ControllerMethods/Register/register')
registerController.getAreasOfInterest = require('./ControllerMethods/Register/getAreasOfInterest')
registerController.getUsersAge = require('./ControllerMethods/Register/getUsersAge')
registerController.updateAreasOfInterest = require('./ControllerMethods/Register/updateAreasOfInterest')
registerController.updateJobHistory = require('./ControllerMethods/Register/updateJobHistory')

module.exports = registerController