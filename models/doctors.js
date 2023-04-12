const mongoose = require('mongoose');

const adressSchema = mongoose.Schema({
    number: Number,
    typeOfRoute: String,
    route: String,
    zipCode: String,
    city: String,
    department: String,
});

const coordinatesSchema = mongoose.Schema({
    latitude: String,
    longitude: String
});

const locationSchema = mongoose.Schema({
    address: adressSchema,
    coordinates: coordinatesSchema
});

const doctorSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    location: locationSchema,
    sector: { type: mongoose.Schema.Types.ObjectId, ref: 'sectors' },
    recommandations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recommandations' }],
    specialties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'specialties' }],
    languages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'languages' }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags' }],
    confidentiality: { type: mongoose.Schema.Types.ObjectId, ref: 'confidentialities' }
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = Doctor;