const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    address: String,
    latitude: Number,
    longitude: Number,
    sector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sectors',
    },
    recommandations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recommandations',
    }],
    specialties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'specialties',
    }],
    languages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'languages',
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tags',
    }],
    confidentiality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'confidentialities',
    },
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = Doctor;