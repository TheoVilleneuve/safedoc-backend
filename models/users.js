const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  city: String,
  orientation: String,
  // orientation: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'orientations',
    // },
  gender: String,
  // gender: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'genders',
    // },
  token: String,
  doctor: String,
  isAdmin: Boolean
});

const User = mongoose.model('users', userSchema);

module.exports = User;