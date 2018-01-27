var mongoose = require('mongoose')
var Schema = mongoose.Schema;

//This solves an issue about not being able to overwrite the schema for tests. 
mongoose.models = {}
mongoose.modelSchemas = {}

var bcrypt = require('bcryptjs')

const User = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    userName: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    age: Number,
    password: String,
    confirmPassword: String,
    language: String,
    areasOfInterest: [{
      years: Number,
      value: String,
      areaOfInterestID: Number,
      numberOfLikes: Number,
      numberOfLinksClicked: Number,
      articlesRead: Number,
      videosWatched: Number,
      pathsStudied: Number
    }],
    jobHistory: [{
      title: String,
      company: String,
      startDate: Date,
      endDate: Date, 
      isWorkingHere: Boolean,
      experienceID: Number,
      numberOfYearsHere: this.endDate - this.startDate
    }],
    mentors: [],
    mentees: [],
    terms: Boolean,
    basicRegistrationComplete: Boolean,
    areasOfInterestRegistrationComplete: Boolean,
    jobHistoryRegistrationComplete: Boolean,
    userRegistrationComplete: Boolean,
    isUserLoggedIn: Boolean
  },
  {
    timestamps: true
  },
  {
    collection: 'users'
  }
)

// hashes passwords before saving using bcryptjs
User.pre('save', function(next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    user.password = hash
    next()
  })
})

module.exports = mongoose.model('User', User)
