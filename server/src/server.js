let express = require('express')
let passport = require('passport')
let path = require('path')
let bodyParser = require('body-parser')
let cors = require('cors')
let routes = require('./routes')
let expressValidator = require('express-validator')
let expressSession = require('express-session')
// Need to mpn install the config module and use it to determine the enivornment. 

// import and use passport Strategy
let passportStrategy = require('../lib/passport')
passport.use(passportStrategy)

const defaultConfiguration = "mongodb://localhost:27017/mentoid"
const testConfiguration = "mongodb://localhost:27017/test-mentoid"

const mongoose = require('mongoose')
const bluebird = require('bluebird');
mongoose.Promise = bluebird;

const mode = process.env.NODE_ENV
console.log(mode)

if(process.env.NODE_ENV === 'test'){
  mongoose.connect(testConfiguration).then(
  () => {
    console.log('Connected to test database.')
  },
  err => {
    console.log('Can not connect to the database' + err)
  }
)
} else {
  mongoose.connect(defaultConfiguration).then(
    () => {
      console.log('Connected to development database.')
    },
    err => {
      console.log('Can not connect to the database' + err)
    }
  )
}

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUnitialized: true
}))

app.use(cors())
app.use('/', routes);

const port = process.env.PORT || 4000

const server = app.listen(port, function() {
  console.log('Listening on port ' + port)
})

