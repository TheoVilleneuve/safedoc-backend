var express = require('express');
var router = express.Router();

const Recommandation = require('../models/recommandations');

// GET /recommandations

router.get('/', async (req, res) => {
    try {
        const recommandations = await Recommandation.find();
        res.json({ result: true, length: recommandations.length, recommandations: recommandations });
    } catch (error) {
        res.json({ result: false, error: "An error occurred while retrieving recommandations" });
    }
});


// Recommandation /doctors 

router.delete('/', (req, res) => {
    Doctor.deleteMany({})
        .then(data => {
            if (data) {
                res.json({ result: true, message: "Recommandation collection successfully deleted" });
            } else {
                res.json({ result: false, error: "Failed to delete collection Recommandation" });
            }
        })
});

module.exports = router;
