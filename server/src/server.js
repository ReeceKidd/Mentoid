var express = require('express'),
  passport = require('passport'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors')
  routes = require('./routes')

// import and use passport Strategy
passportStrategy = require('../lib/passport')
passport.use(passportStrategy)

const { mongoose } = require('../config/DB.js')

mongoose.connect('mongodb://localhost:27017/mentoid').then(
  () => {
    console.log('Database is connected')
  },
  err => {
    console.log('Can not connect to the database' + err)
  }
)

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use('/', routes);

const port = process.env.PORT || 4000

const server = app.listen(port, function() {
  console.log('Listening on port ' + port)
})
