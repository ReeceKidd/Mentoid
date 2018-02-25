const generatorController = {}

generatorController.generateAreasOfInterest = require('./ControllerMethods/Generator/areasOfInterest.js')
generatorController.updateHasProfilePicture = require('./ControllerMethods/Generator/updateHasProfilePicture.js')

module.exports = generatorController;