var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

const User = new mongoose.Schema(
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
    country: String,
    areasOfInterest: Array,
    basicRegistrationComplete: Boolean,
    areasOfInterestRegistrationComplete: Boolean,
    userRegistrationComplete: Boolean
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
