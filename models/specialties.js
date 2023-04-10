const mongoose = require('mongoose');

const specialtiesSchema = mongoose.Schema({
    value: String,
})

const Specialty = mongoose.model('specialties', specialtiesSchema);

module.exports = Specialty;