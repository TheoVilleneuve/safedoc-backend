var express = require('express');
var router = express.Router();

const Sector = require('../models/sectors');

// GET /sectors

router.get('/', async (req, res) => {
    try {
        const sectors = await Sector.find();
        res.json({ result: true, sectors: sectors });
    } catch (error) {
        res.json({ result: false, error: "An error occurred while retrieving sectors" });
    }
});

module.exports = router;
