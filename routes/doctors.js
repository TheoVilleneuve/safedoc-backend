var express = require('express');
var router = express.Router();

const Doctor = require('../models/doctors');
const { checkBody } = require('../modules/checkBody');

// GET /doctors

// POST /doctors/create : create 5 fictive doctors

router.post('/create', (req, res) => {
    for (let i = 0; i < 5; i++) {
        const newDoctor = new Doctor ({
            firstname: `Denis${i}`,
            lastname: "Denis",
            email: `denis${i}@mail.com`,
            phone: "33 666 66 66 66",
            location: {
                address: {
                    number: "1",
                    typeOfRoute: "rue",
                    route: "de Stockholm",
                    zipCode: "75008",
                    city: "Paris",
                    department: "Ile-de-France"
                },
                coordinates: {
                    latitude: 48.85657481132444,
                    longitude: 2.35664611342782
                }
            },
            // sector: "",
            // recommandations: ["", "", ""],
            // specialties: ["médecin généraliste", "pneumologue"],
            // languages: ["français, anglais"],
            // tags: ["gay-friendly, tiers-payant"],
            // confidentialityLevel: 0
        });
        newDoctor.save();
    }
});

// POST /doctors/add

router.post('/add', (req, res) => {
    // Check the mandatory fields
    if (!checkBody(req.body, [''])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    // Check if the doctor has not already been added
    // Create doctor
    const newDoctor = new Doctor ({
        firstname: req.body.firstname,
        lastname: request.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        location: {
            address: {
                number: req.body.phone,
                typeOfRoute: req.body.typeOfRoute,
                route: req.body.route,
                zipCode: req.body.zipCode,
                city: req.body.city,
                department: req.body.department
            },
            coordinates: {
                latitude: req.body.latitude,
                longitude: req.body.longitude
            }
        }
    });
    // Add doctor to DB
    newDoctor.save()
    .then()
});

// DELETE /doctors/all

router.delete('/all', (req,res) => {
    Doctor.deleteMany({ })
});

module.exports = router;
