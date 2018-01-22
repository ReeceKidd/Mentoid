var express = require('express')

const routes = express();

//Controller imports
const adminController = require('../controllers/adminController.js')
const registerController = require('../controllers/registerController.js')
const loginController = require('../controllers/loginController.js')
const testController = require('../controllers/testController.js')

//Admin routes
routes.get('/admin/get-users', adminController.getUsers)

//Register Routes
routes.post('/register', registerController.register)
routes.get('/check/username/:username', registerController.checkUserName)
routes.get('/check/email/:email', registerController.checkEmail)
routes.get('/get/areas-of-interest/:userID', registerController.getAreasOfInterest)
routes.get('/get/age/:userID', registerController.getUsersAge)
routes.post('/update/areas-of-interest', registerController.updateAreasOfInterest)

//Login Routes
routes.post('/login', loginController.login)

//Testing Routes 
routes.get('/get-single-user-ID', testController.getSingleUserID)

//Areas of Interest Routes
//Get every area of interest
//Get total number of users for area of interest. 

module.exports = routes