var express = require('express')

const routes = express();

//Controller imports
const registerController = require('../controllers/registerController.js')
const loginController = require('../controllers/loginController.js')

//Register Routes
routes.post('/register', registerController.register)
routes.get('/check/username/:username', registerController.checkUserName)
routes.get('/check/email/:email', registerController.checkEmail)
routes.get('/get/areas-of-interest/:userID', registerController.getAreasOfInterest)
routes.post('/update/areas-of-interest', registerController.updateAreasOfInterest)

//Login Routes
routes.post('/login', loginController.login)

//Areas of Interest Routes
//Get every area of interest
//Get total number of users for area of interest. 

module.exports = routes