var express = require('express');
var router = express.Router();

const Tag = require('../models/tags');
const { checkBody } = require('../modules/checkBody');

// GET /tags

router.get('/', (req,res) => {
    Tag.find()
    .then(data => {
        res.json({result: true, tags: data});
    })
})

module.exports = router;
