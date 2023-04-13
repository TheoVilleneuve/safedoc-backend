var express = require('express');
var router = express.Router();

const Language = require('../models/languages');

// GET /languages

router.get('/', async (req, res) => {
    try {
        const languages = await Language.find();
        res.json({ result: true, languages: languages });
    } catch (error) {
        res.json({ result: false, error: "An error occurred while retrieving languages" });
    }
});

module.exports = router;
