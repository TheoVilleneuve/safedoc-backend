var express = require('express');
var router = express.Router();
require('../models/connection');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const Orientation = require('../models/orientations2');


router.get('/orientations', async (req, res) => {
  try {
    const orientations = await Orientation.find();
    res.json({result: true, orientations: orientations});
  } catch (error) {
    res.status(500).json({ result: false, error: "An error occurred while retrieving orientations" });
  }
});

module.exports = router;
