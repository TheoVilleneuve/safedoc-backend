const mongoose = require('mongoose');

const tagsSchema = mongoose.Schema({
    value: String,
    category: String,
    selected: Number
})

const Tag = mongoose.model('tags', tagsSchema);

module.exports = Tag;