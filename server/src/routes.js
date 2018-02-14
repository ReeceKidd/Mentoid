var express = require('express')
const routes = express()

var multer = require('multer')
var path = require('path')
var fs = require('fs')
const profilePictureDirectory = 'C:/Users/User/Desktop/Mentoid/server/profile-pictures/'

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './profile-pictures')
  },
  filename: function (req, file, cb) {

    var imagePathJPG = profilePictureDirectory + req.query.userID + '.jpg'
    var imagePathJPEG = profilePictureDirectory + req.query.userID + '.jpeg'
    var imagePathPNG = profilePictureDirectory + req.query.userID + '.png'

    if (fs.existsSync(imagePathJPG)) {
      fs.unlink(imagePathJPG)
    }

    if (fs.existsSync(imagePathJPEG)) {
      fs.unlink(imagePathJPEG)
    }

    if (fs.existsSync(imagePathPNG)) {
      fs.unlink(imagePathPNG)
    }

    cb(null, req.query.userID + path.extname(file.originalname))
  }
})

var upload = multer({
  storage: storage
})


//Controller imports
const adminController = require('../controllers/adminController.js')
const registerController = require('../controllers/registerController.js')
const userController = require('../controllers/userController.js')
const testController = require('../controllers/testController.js')
const routingController = require('../controllers/routingController.js')
const matchingController = require('../controllers/matchingController.js')
const generatorController = require('../controllers/generatorController.js')

//Admin routes
routes.get('/admin/get-users', adminController.getUsers)

//Register Routes
routes.post('/register', registerController.register)
routes.get('/get/basic-registration/:userID', registerController.getBasicRegistration)
routes.get('/check/username/:username', registerController.checkUserName)
routes.get('/check/email/:email', registerController.checkEmail)
routes.get('/get/areas-of-interest/:userID', registerController.getAreasOfInterest)
routes.get('/get/areas-of-interest-names/:userID', registerController.getAreasOfInterestNames)
routes.get('/get/age/:userID', registerController.getUsersAge)
routes.post('/update/areas-of-interest', registerController.updateAreasOfInterest)
routes.post('/update/job-history', registerController.updateJobHistory)
routes.get('/get/job-history/:userID', registerController.getJobHistory)
routes.post('/update/education', registerController.updateEducation)
routes.get('/get/education-history/:userID', registerController.getEducationHistory)
routes.post('/upload-profile-picture', upload.single('image'), registerController.uploadProfilePicture)
routes.get('/get/profile-picture/:userID', registerController.getProfilePicture)
routes.post('/update/mentor-preferences/', registerController.updateMentorPreferences)
routes.get('/get/profile-completeness/:userID', registerController.getProfileCompleteness)
routes.post('/update/social-media', registerController.updateSocialMedia)
routes.get('/get/social-media/:userID', registerController.getSocialMedia)

//Generator Routes
routes.post('/generate/areas-of-interest', generatorController.generateAreasOfInterest)

//Matching Routes
routes.get('/get/potential-mentors/:userID', matchingController.getPotentialMentors)

//User Routes
routes.post('/login', userController.login)
routes.get('/logout/:userID', userController.logout)

//Testing Routes 
routes.get('/get-single-user-ID', testController.getSingleUserID) //This reveals far too much information
routes.get('/get/userID/:userName', testController.getUserIDFromUserName)


//Routing Routes
routes.get('/get/basic-registration-complete/:userID', routingController.getBasicRegistrationCompleteValue)
routes.get('/get/areas-of-interest-registration-complete/:userID', routingController.getAreasOfInterestRegistrationCompleteValue)
routes.get('/get/is-user-logged-in/:userID', routingController.getIsUsersLoggedIn)
//Areas of Interest Routes
//Get every area of interest
//Get total number of users for area of interest. 

module.exports = routes