var mongoose = require('mongoose');

// Define collection and schema for Items
var User = new mongoose.Schema({
  userName: String,
  email: String,
  confirmationEmail: String,
  age: Number,
  password: String,
  confirmationPassword: String
},
{
timestamps: true
},
{
	collection: 'users'
});

module.exports = mongoose.model('User', User);