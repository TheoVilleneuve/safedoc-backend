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
    if (!checkBody(req.body, ['firstname', 'lastname', 'city'])) {
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
                    .then(data => {
                        res.json({ result: true, doctor: data })
                    });
            }
        })
    // Create doctor
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
