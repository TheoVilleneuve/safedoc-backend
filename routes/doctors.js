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
                    specialties: req.body.specialties,
                    languages: req.body.languages,
                    tags: req.body.tags,
                    confidentiality: 3
                });
                // Add doctor to DB
                newDoctor.save()
                    .then(data => {
                        res.json({ result: true, doctor: data })
                    });
            }
        })
});

    // Create doctor

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
// PUT /doctors/tags


// router.put('/tags/:id', async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { value, category } = req.body;
  
//       // Check if doctor exists
//       const doctor = await Doctor.findById(id);
//       if (!doctor) {
//         return res.status(404).json({ error: 'Doctor not found' });
//       }
  
//       // Update doctor's tags
//       const tagIndex = doctor.tags.findIndex(tag => tag._id == req.tag_id);
//       if (tagIndex < 0) {
//         return res.status(404).json({ error: 'Tag not found' });
//       }
//       doctor.tags[tagIndex].value = value;
//       doctor.tags[tagIndex].category = category;
//       await doctor.save();
  
//       res.json(doctor);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });

router.put('/tags/:id', async (req, res) => {
    try {
        await Doctor.updateOne({ _id: req.params.id }, {
            tags: req.body.tags
        });

        const updatedDoctor = await Doctor.findOne({ _id: req.params.id });
        res.json({ user: updatedDoctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
