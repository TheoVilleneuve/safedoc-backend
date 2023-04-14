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

const tagsSchema = mongoose.Schema({
    name: String,
    category: String,
    selected: Number
})


const languages =mo

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
    languages: languagesSchema,
    // tags: [String],
    tags: [tagsSchema],
    confidentiality: Number
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = Doctor;