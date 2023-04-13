var express = require('express');
var router = express.Router();

const Gender = require('../models/genders');

// GET /genders

router.get('/', async (req, res) => {
  try {
    const genders = await Gender.find();
    res.json({ result: true, genders: genders });
  } catch (error) {
    res.json({result: false, error: "An error occurred while retrieving genders" });
  }
});

module.exports = router;
