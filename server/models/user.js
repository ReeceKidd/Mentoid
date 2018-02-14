var mongoose = require('mongoose')
var Schema = mongoose.Schema;

//This solves an issue about not being able to overwrite the schema for tests. 
mongoose.models = {}
mongoose.modelSchemas = {}

var bcrypt = require('bcryptjs')

const User = new Schema({
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
  terms: Boolean,
  facebook: String,
  instagram: String,
  twitter: String,
  snapchat: String,
  linkedIn: String,
  medium: String,
  youtube: String,
  website: String,
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
    startYear: String,
    endYear: String,
    isWorkingHere: String,
    experienceID: String
  }],
  education: [{
    degree: String,
    school: String,
    fieldOfStudy: String,
    startYear: String,
    endYear: String,
    educationID: String
  }],
  mentorPreferences: {
    mentoringAreasOfInterest: [],
    prefferedMentoringFormats: [],
    maximumTravelDistanceKM: String,
    mentoringLanguages: [],
    prefferedEducation: [],
    minimumAge: String,
    maximumAge: String
  },
  menteePreferences: {
    areasOfInterest: [],
    prefferedMentoringFormats: [],
    maximumTravelDistanceKM: String,
    mentoringLanguages: [],
    prefferedEducation: [],
    minimumAge: String,
    maximumAge: String
  },
  mentors: [],
  mentees: [],
  location: {
    latitude: Number,
    longitude: Number
  },
  basicRegistrationComplete: Boolean,
  areasOfInterestRegistrationComplete: Boolean,
  jobHistoryRegistrationComplete: Boolean,
  educationRegistrationComplete: Boolean,
  profilePictureUploaded: Boolean,
  mentorPreferencesComplete: Boolean,
  menteePreferencesComplete: Boolean,
  socialMediaComplete: Boolean,
  isUserLoggedIn: Boolean
}, {
  timestamps: true
}, {
  collection: 'users'
})

// hashes passwords before saving using bcryptjs
User.pre('save', function (next) {
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

// hashes confirmPassword before saving using bcryptjs
User.pre('save', function (next) {
  const user = this
  if (!user.isModified('confirmPassword')) {
    return next()
  }
  bcrypt.hash(user.confirmPassword, 10, (err, hash) => {
    if (err) {
      return next(err)
    }
    user.confirmPassword = hash
    next()
  })
})

module.exports = mongoose.model('User', User)