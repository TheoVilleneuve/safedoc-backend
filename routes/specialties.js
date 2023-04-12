var express = require('express');
var router = express.Router();

const Speciality = require('../models/specialties');

// GET /specialties

router.get('/', async (req, res) => {
    try {
        const specialties = await Speciality.find();
        res.json({ result: true, specialties: specialties });
    } catch (error) {
        res.json({ result: false, error: "An error occurred while retrieving specialties" });
    }
});

module.exports = router;
