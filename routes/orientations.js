var express = require('express');
var router = express.Router();

const Orientation = require('../models/orientations');

// GET /orientations

router.get('/', async (req, res) => {
  try {
      const orientations = await Orientation.find();
      res.json({ result: true, orientations: orientations });
  } catch (error) {
      res.json({ result: false, error: "An error occurred while retrieving orientations" });
  }
});

module.exports = router;
