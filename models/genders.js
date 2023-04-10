const mongoose = require('mongoose');

const genderSchema = mongoose.Schema({
    value: String,
  });
  
  const Gender = mongoose.model('users', genderSchema);
  
  module.exports = Gender;