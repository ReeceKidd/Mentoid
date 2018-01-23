var express = require('express')

const routes = express();

//Controller imports
const adminController = require('../controllers/adminController.js')
const registerController = require('../controllers/registerController.js')
const userController = require('../controllers/userController.js')
const testController = require('../controllers/testController.js')
const routingController = require('../controllers/routingController.js')

//Admin routes
routes.get('/admin/get-users', adminController.getUsers)

//Register Routes
routes.post('/register', registerController.register)
routes.get('/check/username/:username', registerController.checkUserName)
routes.get('/check/email/:email', registerController.checkEmail)
routes.get('/get/areas-of-interest/:userID', registerController.getAreasOfInterest)
routes.get('/get/age/:userID', registerController.getUsersAge)
routes.post('/update/areas-of-interest', registerController.updateAreasOfInterest)

//User Routes
routes.post('/login', userController.login)
routes.get('/logout/:userID', userController.logout)

//Testing Routes 
routes.get('/get-single-user-ID', testController.getSingleUserID)

//Routing Routes
routes.get('/get/basic-registration-complete/:userID', routingController.getBasicRegistrationCompleteValue)
routes.get('/get/areas-of-interest-registration-complete/:userID', routingController.getAreasOfInterestRegistrationCompleteValue)

//Areas of Interest Routes
//Get every area of interest
//Get total number of users for area of interest. 

module.exports = routes