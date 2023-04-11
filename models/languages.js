const mongoose = require('mongoose');

const languagesSchema = mongoose.Schema({
    value: String,
})

const Language = mongoose.model('languages', languagesSchema);

module.exports = Language;