var express = require('express')
var passport = require('passport')
var path = require('path')
var bodyParser = require('body-parser')
var cors = require('cors')
var routes = require('./routes')
var expressValidator = require('express-validator')
var expressSession = require('express-session')
var mongoose = require('mongoose')
var bluebird = require('bluebird')
var morgan = require('morgan')
var http = require('http')

var passportStrategy = require('../lib/passport')
passport.use(passportStrategy)

const app = express()

// Database configuration file. 
var config = require('./_config')

mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err)
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env])
  }
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.use(cors())
app.use('/', routes)

const port = process.env.PORT || 4000


const server = app.listen(port, function() {
  console.log('Listening on port ' + port)
})

module.exports = app // This is for testing.

