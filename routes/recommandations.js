var express = require('express');
var router = express.Router();

const Recommandation = require('../models/recommandations');

// GET /recommandations

router.get('/', async (req, res) => {
    try {
        const recommandations = await Recommandation.find();
        res.json({ result: true, recommandations: recommandations });
    } catch (error) {
        res.json({ result: false, error: "An error occurred while retrieving recommandations" });
    }
});

module.exports = router;
