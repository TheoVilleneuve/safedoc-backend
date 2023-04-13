const mongoose = require('mongoose');

// const adressSchema = mongoose.Schema({
//     number: Number,
//     typeOfRoute: String,
//     route: String,
//     zipCode: String,
//     city: String,
//     department: String,
// });

// const coordinatesSchema = mongoose.Schema({
//     latitude: Number,
//     longitude: Number
// });

// const locationSchema = mongoose.Schema({
//     address: adressSchema,
//     coordinates: coordinatesSchema
// });

const doctorSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    // location: locationSchema,
    address: String,
    latitude: Number,
    longitude: Number,
    // coordinatesSchema: coordinatesSchema,
    sector: Number,
    // recommandations: ,
    specialties: [String],
    languages: [String],
    tags: [String],
    confidentiality: Number
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = Doctor;