const mongoose = require('mongoose');

const orientationSchema = mongoose.Schema({
    value: String,
  });
  
  const Orientation = mongoose.model('users', orientationSchema);
  
  module.exports = Orientation;