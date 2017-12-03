var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

const User = new mongoose.Schema(
  {
    fullName: {
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
    confirmationEmail: {
      type: String
    },
    age: Number,
    password: String
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
