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

router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findOne({_id: req.params.id});
        if (doctor) {
            res.json({ result: true, doctor: doctor });
        } else {
            res.json({ result: false, error: "Doctor not found" });
        }
    } catch (error) {
        res.json({ error: "An error occurred while retrieving the doctor" });
    }
});

// GET / doctors / Search



// POST /doctors/add

router.post('/add', (req, res) => {
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
});

// PUT /doctors/tags/:doctorId

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

module.exports = router;