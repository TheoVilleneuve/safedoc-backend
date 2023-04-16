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

// const sectorSchema = mongoose.Schema({
//     value: Number,
//     description: String
// })

// const languagesSchema = mongoose.Schema({
//     value: String,
//     translation: String
// })

// const tagsSchema = mongoose.Schema({
//     name: String,
//     category: String,
//     selected: Number
// })

// const confidentialitySchema = mongoose.Schema({
//     value: Number,
//     description: String
// })

// const doctorSchema = mongoose.Schema({
//     firstname: String,
//     lastname: String,
//     email: String,
//     phone: String,
//     // location: locationSchema,
//     address: String,
//     latitude: Number,
//     longitude: Number,
//     // coordinatesSchema: coordinatesSchema,
//     sector: sectorSchema,
//     // recommandations: ,
//     specialties: [String],
//     languages: [languagesSchema],
//     // tags: [String],
//     tags: [tagsSchema],
//     confidentiality: confidentialitySchema
// });

const doctorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        // required: true,
    },
    lastname: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    phone: {
        type: String,
        // required: true,
    },
    address: {
        type: String,
        // required: true,
    },
    latitude: {
        type: Number,
        // required: true,
    },
    longitude: {
        type: Number,
        // required: true,
    },
    sector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sectors',
        // required: true,
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
        // required: true,
    },
});

const Doctor = mongoose.model('doctors', doctorSchema);

module.exports = Doctor;