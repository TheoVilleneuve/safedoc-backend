const mongoose = require('mongoose');

const tagsSchema = mongoose.Schema({
    value: String,
    category: String
})

const Tag = mongoose.model('specialties', tagsSchema);

module.exports = Tag;