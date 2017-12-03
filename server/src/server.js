const express = require('express'),
  passport = require('passport'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('../config/DB'),
  itemRoutes = require('../expressRoutes/itemRoutes'),
  userRoutes = require('../expressRoutes/userRoutes')

// import and use passport Strategy
passportStrategy = require('../lib/passport')
passport.use(passportStrategy)

mongoose.Promise = global.Promise
mongoose.connect(config.DB).then(
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
app.use('/items', itemRoutes)
app.use('/users', userRoutes)
const port = process.env.PORT || 4000

const server = app.listen(port, function() {
  console.log('Listening on port ' + port)
})
