var mongoose = require('mongoose')

const User = new mongoose.Schema(
  {
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
    password: String,
    areasOfInterest: {
        type: Array
    }
  },
  {
    timestamps: true
  },
  {
    collection: 'users'
  }
)


module.exports = mongoose.model('User', User)
