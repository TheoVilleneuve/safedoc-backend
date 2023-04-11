var express = require('express');
var router = express.Router();
require('../models/connection');
const Orientation = require('../models/orientations');
const app = express();

// Route to get all orientations
app.get('/orientations', async (req, res) => {
  try {
    const orientations = await Orientation.find();
    res.json(orientations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve orientations' });
  }
});


module.exports = router;
