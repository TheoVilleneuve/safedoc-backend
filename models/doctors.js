const mongoose = require('mongoose');

const sectorSchema = mongoose.Schema({
    value: Number,
    description: String
});

// const tagsSchema = mongoose.Schema({
//     value: String,
//     category: String
// });

const confidentialitySchema = mongoose.Schema({
    value: Number,
    description: String
});

const doctorSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    address: String,
    latitude: Number,
    longitude: Number,
    sector: sectorSchema,
    // recommandations: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'recommandations',
    // }],
    specialties: [String],
    languages: [String],
    tags: [String],
    confidentiality: confidentialitySchema
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = Doctor;