const mongoose = require('mongoose');

const confidentialityLevelSchema = mongoose.Schema({
    value: Number,
    description: String
})

const ConfidentialityLevel = mongoose.model('confidentialityLevels', confidentialityLevelSchema);

module.exports = ConfidentialityLevel;