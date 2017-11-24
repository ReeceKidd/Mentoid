var mongoose = require('mongoose');

// Define collection and schema for Items
var User = new mongoose.Schema({
  userName: {
    type: String,
    set: toLower(),
  },
  email: {
    type: String,
    set: toLower(),
  },
  confirmationEmail: {
    type: String,
    set: toLower()
  },
  age: Number,
  password: String,
  confirmationPassword: String
}, {
  timestamps: true
}, {
  collection: 'users'
});

function toLower(str) {
  return str.toLowerCase()
}

module.exports = mongoose.model('User', User);