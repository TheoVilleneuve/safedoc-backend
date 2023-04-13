var express = require('express');
var router = express.Router();

const Doctor = require('../models/doctors');
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

// GET /doctors/:id

router.get('/:id', (req, res) => {
    Doctor.findOne({ _id: req.params.id })
        .then(data => {
            res.json({ result: true, doctors: data });
        })
})

// POST /doctors/add

router.post('/add', (req, res) => {
    // Check the mandatory fields
    if (!checkBody(req.body, ['firstname', 'lastname', 'email', 'phone', 'address'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    // Check if the doctor has not already been added
    Doctor.findOne({ firstname: req.body.firstname, lastname: req.body.lastname, "location.address.city": req.body.city })
        // CITY -> ADDRESS
        .then(data => {
            if (data) {
                res.json({ result: false, error: 'Doctor already in database' })
            } else {
                const newDoctor = new Doctor({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    sector: req.body.sector,
                    // recommandations: req.body.recommandations
                    specialties: req.body.specialties,
                    languages: req.body.languages,
                    tags: req.body.tags,
                    confidentiality: 3
                    // location: {
                    // address: {
                    // number: req.body.phone,
                    // typeOfRoute: req.body.typeOfRoute,
                    // route: req.body.route,
                    // zipCode: req.body.zipCode,
                    // city: req.body.city,
                    // department: req.body.department
                    // },
                    // coordinates: {
                    // latitude: req.body.latitude,
                    // longitude: req.body.longitude
                    // }
                    // }
                });
                // Add doctor to DB
                newDoctor.save()
                    .then(data => {
                        res.json({ result: true, doctor: data })
                    });
            }
        })
    // Create doctor
});

// PUT /doctors/tags/:id

// router.put('/tags/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { value, category } = req.body;

//         // Check if doctor exists
//         const doctor = await Doctor.findById(id);
//         if (!doctor) {
//             return res.status(404).json({ error: 'Doctor not found' });
//         }

//         // Update doctor's tags
//         const tagIndex = doctor.tags.indexOf(tag => tag._id == req.query.tag_id);
//         if (tagIndex < 0) {
//             return res.status(404).json({ error: 'Tag not found' });
//         }
//         doctor.tags[tagIndex].value = value;
//         doctor.tags[tagIndex].category = category;
//         await doctor.save()
//             .then(doctor => {
//                 res.json({ success: doctor })
//             });

//         res.json(doctor);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// router.post('/tags/:id', async (req, res) => {
//     try {
//         await Doctor.updateOne({ _id: req.params.id }, {
//             tags: req.body.value
//         });

//         const updatedDoctor = await Doctor.findOne({ _id: req.params.id });
//         res.json({ doctor: updatedDoctor });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// router.put('/tags/:id', async (req, res) => {
//     try {
//         await Doctor.updateOne({ $push: {_id: req.params.id} }, {
//             tags: req.body.tags
//         });

//         const updatedDoctor = await Doctor.findOne({ _id: req.params.id });
//         res.json({ user: updatedDoctor });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// router.put('/tags/:id', async (req, res) => {
//     try {
//         const doctorId = req.params.id;
//         const tags = req.body.tags; // On récupère les tags depuis le corps de la requête

//         // On utilise updateOne pour mettre à jour le document doctor correspondant
//         await Doctor.updateOne({ _id: doctorId }, { $push: { tags: tags } });

//         // On récupère le document doctor mis à jour
//         const updatedDoctor = await Doctor.findOne({ _id: doctorId });

//         // On renvoie le document doctor mis à jour en réponse
//         res.json({ doctor: updatedDoctor });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// router.put('/tags/:doctorId', async (req, res) => {
//     try {
//         const doctorId = req.params.doctorId;
//         const tags = req.body.tags; // On récupère les tags depuis le corps de la requête

//         // On parcourt le tableau des tags
//         for (const tag of tags) {
//             const existingTag = await Doctor.findOne({ tags: tag.name }); // On vérifie si le tag existe déjà en cherchant par son nom

//             if (existingTag) {
//                 // Si le tag existe déjà, on met à jour son champ "selected"
//                 existingTag.selected += 1;
//                 await existingTag.save();
//             } else {
//                 // Si le tag n'existe pas, on le crée avec un champ "selected" initialisé à 1
//                 const newTag = new Tag({ name: tag.name, selected: 1 });
//                 await newTag.save();
//             }
//         }

//         // On met à jour le document doctor correspondant avec les tags modifiés
//         const updatedDoctor = await Doctor.findOneAndUpdate(
//             { _id: doctorId },
//             { tags: tags },
//             { new: true }
//         );

//         // On renvoie le document doctor mis à jour en réponse
//         res.json({ doctor: updatedDoctor });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

router.put('/tags/:doctorId', async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
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

        // On renvoie le document doctor mis à jour en réponse
        res.json({ doctor: updatedDoctor });
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

// DELETE /doctors/delete/:id

module.exports = router;
