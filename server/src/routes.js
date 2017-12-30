var express = require('express')

const routes = express();

//Controller imports
const registerController = require('../controllers/registerController.js')
const loginController = require('../controllers/loginController.js')
const userController = require('../controllers/userController.js')

//Register Routes
routes.post('/users/register', registerController.register)
routes.get('/users/check/username/:username', registerController.checkUsername)
routes.get('/users/check/email/:email', registerController.checkEmail)

//Login Routes
routes.post('/users/login', loginController.login)

module.exports = routes