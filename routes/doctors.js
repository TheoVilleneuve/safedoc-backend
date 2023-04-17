var express = require('express');
var router = express.Router();

const Doctor = require('../models/doctors');
const LOCATION_API_KEY = process.env.LOCATION_API_KEY;
const { checkBody } = require('../modules/checkBody');

// GET /doctors

router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json({ result: true, doctors: doctors });
    } catch (error) {
        res.json({ result: false, error: "An error occurred while retrieving doctors" });
    }
});

// GET /doctors/search/:id

router.get('/search/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ _id: req.params.id });
        if (doctor) {
            res.json({ result: true, doctor: doctor });
        } else {
            res.json({ result: false, error: "Doctor not found" });
        }
    } catch (error) {
        res.json({ error: "An error occurred while retrieving the doctor" });
    }
});

// POST /doctors/search/city

router.post('/search/city', async (req, res) => {
    try {
        const city = req.body.city;
        const url = `https://us1.locationiq.com/v1/search?key=${LOCATION_API_KEY}&q=${city}&format=json`;
        const response = await fetch(url);
        const data = await response.json();

        const filteredData = data.filter((item) => item.type === 'administrative');
        const cities = [];
        for (let i = 0; i < filteredData.length; i++) {
            const { lat, lon, display_name: name } = filteredData[i];
            const infos = { latitude: lat, longitude: lon, name };
            cities.push(infos);
        }
        res.json({ result: true, cities: cities });
    } catch (error) {
        res.json({ error: "An error occurred while searching for location" });
    }
})

// POST /doctors/search

// {"specialties": "643d3f5e2559f4dee0c0a839"}

// {"specialties": "643d3f5e2559f4dee0c0a839",
// "lastname": "Dupont"
// }

// {"lastname": "Dupont"}

// router.post('/search', async (req, res) => {
//     try {
//         if (req.body.lastname && req.body.specialties) {

//             Doctor.find({ lastname: req.body.lastname, specialties: req.body.specialties })
//             .populate('sector')
//             .populate('recommandations')
//             .populate('specialties')
//             .populate('languages')
//             .populate('tags')
//             .populate('confidentiality')
//             .then(doctors => {
//                 if (doctors.length > 0) {
//                     res.json({ result: true, doctors: doctors });
//                 } else {
//                     res.json({ result: false, error: "No doctor found" });
//                 }
//             });

//         } else if (req.body.lastname) {

//             Doctor.find({ lastname: req.body.lastname })
//                 .populate('sector')
//                 .populate('recommandations')
//                 .populate('specialties')
//                 .populate('languages')
//                 .populate('tags')
//                 .populate('confidentiality')
//                 .then(doctors => {
//                     if (doctors.length > 0) {
//                         res.json({ result: true, doctors: doctors });
//                     } else {
//                         res.json({ result: false, error: "No doctor found" });
//                     }
//                 });

//         } else if (req.body.specialties) {

//             Doctor.find({ specialties: req.body.specialties })
//                 .populate('sector')
//                 .populate('recommandations')
//                 .populate('specialties')
//                 .populate('languages')
//                 .populate('tags')
//                 .populate('confidentiality')
//                 .then(doctors => {
//                     if (doctors.length > 0) {
//                         res.json({ result: true, doctors: doctors });
//                     } else {
//                         res.json({ result: false, error: "No doctor found" });
//                     }
//                 });

//         } else {
//             res.json({ result: false, error: "No search criteria provided" });
//         }
//     } catch (error) {
//         res.json({ error: "An error occurrend while searching for doctors" });
//     }
// });

// const findDoctorsByCriteria = (req, res, searchCriteria) => {
//     Doctor.find(searchCriteria)
//         .populate('sector')
//         .populate('recommandations')
//         .populate('specialties')
//         .populate('languages')
//         .populate('tags')
//         .populate('confidentiality')
//         .then(doctors => {
//             if (hasResults(doctors)) {
//                 res.json({ result: true, doctors: doctors });
//             } else {
//                 res.json({ result: false, error: "No doctor found" });
//             }
//         })
// };

// const hasResults = (data) => {
//     return data && data.length > 0;
// };

// router.post('/search', async (req, res) => {
//     try {
//         if (req.body.lastname && req.body.specialties) {
//             findDoctorsByCriteria(req, res, {
//                 lastname: req.body.lastname,
//                 specialties: req.body.specialties,
//             });
//         } else if (req.body.lastname) {
//             findDoctorsByCriteria(req, res, { lastname: req.body.lastname });
//         } else if (req.body.specialties) {
//             findDoctorsByCriteria(req, res, { specialties: req.body.specialties });
//         } else {
//             res.json({ result: false, error: "No search criteria provided" });
//         }
//     } catch (error) {
//         res.json({ result: false, error: "An error occurred while searching for doctors" });
//     }
// });

router.post('/add/verify', async (req, res) => {
    if (!checkBody(req.body, ['firstname', 'lastname', 'email'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    try {
        const doctor = await Doctor.findOne({ email: req.body.email });
        if (doctor) {
            res.json({ result: false, error: "email already in use" });
        } else {
            res.json({ result: true, message: "no doctor found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// POST /doctors/add

// {
//     "firstname": "Jean",
//     "lastname": "Dupont",
//     "email": "jean.dupont@example.com",
//     "phone": "0123456789",
//     "address": "123 rue des Champs",
//     "latitude": 48.8566,
//     "longitude": 2.3522,
//     "sector": "64342bb4b977040780965768",
//     "recommandations": ["614b9ad08c7dc41188c2b80d"],
//     "specialties": ["643d3f5e2559f4dee0c0a839", "643d3fb42559f4dee0c0a83d"],
//     "languages": ["643425fcb977040780965745", "643425fcb977040780965746"],
//     "tags": ["643d3c38c615c64dde8acb21", "643d3c4fc615c64dde8acb25"],
//     "confidentiality": "64342852b977040780965757"
// }

router.post('/add', async (req, res) => {
    // Check the mandatory fields
    if (!checkBody(req.body, ['firstname', 'lastname', 'email', 'phone', 'address'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    // Check if the email and phone fields have valid syntax using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // a simple email regex
    const phoneRegex = /^\d{10}$/; // a simple phone regex that checks for 10 digits
    if (!emailRegex.test(req.body.email)) {
        res.json({ result: false, error: 'Invalid email format' });
        return;
    }
    if (!phoneRegex.test(req.body.phone)) {
        res.json({ result: false, error: 'Invalid phone format' });
        return;
    }

    try {
        // const [sector, recommandations, specialties, languages, tags, confidentiality] = await Promise.all([
        //     Sector.findOne({ _id: req.body.sector }),
        //     Recommandation.find({ _id: { $in: req.body.recommandations } }),
        //     Specialty.find({ _id: { $in: req.body.specialties } }),
        //     Language.find({ _id: { $in: req.body.languages } }),
        //     Tag.find({ _id: { $in: req.body.tags } }),
            // Confidentiality.findOne({ _id: req.body.confidentiality }),
            // ]);
        const { firstname,
            lastname, 
            email, phone, address, latitude, longitude, sector, 
            // recommandations, 
            specialties, languages, tags, confidentiality } = req.body;

        // if (!sector) {
        //     res.json({ result: false, error: 'Sector not found' });
        //     return;
        // }

        // if (!recommandations) {
        //     res.json({ result: false, error: 'Recommandations not found' });
        //     return;
        // }

        // if (req.body.specialties.length !== specialties.length) {
        //     res.json({ result: false, error: 'One or more specialties not found' });
        //     return;
        // }

        // if (req.body.languages.length !== languages.length) {
        //     res.json({ result: false, error: 'One or more languages not found' });
        //     return;
        // }

        // if (req.body.tags.length !== tags.length) {
        //     res.json({ result: false, error: 'One or more tags not found' });
        //     return;
        // }

        const newDoctor = new Doctor({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            address: address,
            latitude: latitude,
            longitude: longitude,
            sector: {
                value: sector.value,
                description: sector.description
            },
            // recommandations: recommandations.map((s) => s._id),
            specialties: specialties.value,
            languages: languages.value,
            tags: {
                value: tags.value,
                category: tags.category
            },
            confidentiality: {
                value: 3,
                description: "no display"
            }
        });

        // Add doctor to DB
        newDoctor.save()
            .then(doctor => {
                        res.json({ result: true, newDoctor: doctor });
                    });

    } catch (error) {
        console.error(error);
        res.json({ result: false, error: 'Server error' });
    }
});

// PUT /doctors/tags/:id

router.put('/tags/:id', async (req, res) => {
    try {
        const doctorId = req.params.id;
        const tags = req.body.tags; // On récupère les tags depuis le corps de la requête

        // On récupère le document doctor correspondant
        const doctor = await Doctor.findById(doctorId);

        // On parcourt le tableau des tags
        for (const tag of tags) {
            const existingTagIndex = doctor.tags.findIndex((t) => t.name === tag.name); // On vérifie si le tag existe déjà dans le champ "tags"

            if (existingTagIndex !== -1) {
                // Si le tag existe déjà, on met à jour son champ "selected"
                doctor.tags[existingTagIndex].selected += 1;
            } else {
                // Si le tag n'existe pas, on l'ajoute avec un champ "selected" initialisé à 1
                doctor.tags.push({ name: tag.name, selected: 1 });
            }
        }

        // On met à jour le document doctor correspondant avec les tags modifiés
        const updatedDoctor = await doctor.save();

        // On renvoie l'id et les tags du document doctor mis à jour en réponse
        res.json({ doctorId: doctorId, tags: updatedDoctor.tags });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// PUT /doctors/confidentiality/:id

router.put('/confidentiality/:id', async (req, res) => {
    try {
        const doctorId = req.params.id;
        const confidentialityValue = req.body.value; // On récupère la nouvelle valeur de confidentialité depuis le corps de la requête
        const confidentialityDescription = req.body.description; // On récupère la nouvelle description de confidentialité depuis le corps de la requête

        // On récupère le document doctor correspondant
        const doctor = await Doctor.findById(doctorId);

        // On met à jour le niveau de confidentialité en fonction de la requête
        doctor.confidentiality.value = confidentialityValue;
        doctor.confidentiality.description = confidentialityDescription;

        // On met à jour le document doctor correspondant avec la nouvelle confidentialité
        const updatedDoctor = await doctor.save();

        // On renvoie l'id et la confidentialité du document doctor mis à jour en réponse
        res.json({ doctorId: doctorId, confidentiality: updatedDoctor.confidentiality });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// DELETE /doctors 

router.delete('/', (req, res) => {
    Doctor.deleteMany({})
        .then(data => {
            if (data) {
                res.json({ result: true, message: "Collection doctors successfully deleted" });
            } else {
                res.json({ result: false, error: "Failed to delete collection doctors" });
            }
        })
});

module.exports = router;
