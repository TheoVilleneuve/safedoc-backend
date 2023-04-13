var express = require('express');
var router = express.Router();

const Tag = require('../models/tags');

// GET /tags

router.get('/', async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json({ result: true, tags: tags });
    } catch (error) {
        res.json({ result: false, error: "An error occurred while retrieving tags" });
    }
});

module.exports = router;
