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

// DELETE /recommandations 

router.delete('/', (req, res) => {
    Recommandation.deleteMany({})
        .then(data => {
            if (data) {
                res.json({ result: true, message: "Recommandations collection successfully deleted" });
            } else {
                res.json({ result: false, error: "Failed to delete collection Recommandations" });
            }
        })
});

module.exports = router;
