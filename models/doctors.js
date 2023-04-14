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

const sectorSchema = mongoose.Schema({
    value: Number,
    description: String
})

const languagesSchema = mongoose.Schema({
    value: String,
    translation: String
})

const tagsSchema = mongoose.Schema({
    name: String,
    category: String,
    selected: Number
})

const confidentialitySchema = mongoose.Schema({
    value: Number,
    description: String
})

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
    sector: sectorSchema,
    // recommandations: ,
    specialties: [String],
    languages: [languagesSchema],
    // tags: [String],
    tags: [tagsSchema],
    confidentiality: confidentialitySchema
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = Doctor;