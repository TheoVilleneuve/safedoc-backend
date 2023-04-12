var express = require('express');
var router = express.Router();
require('../models/connection');
const Orientation = require('../models/orientations');
const app = express();

// Route to get all orientations
router.get('/', async (req, res) => {
  try {
    const orientations = await Orientation.find();
    res.json({ result: true, orientations: orientations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: false, error: 'Failed to retrieve orientations' });
  }
});



// Route Post for orientations

router.post('/orientations', async (req, res) => {
  try {
    const { id } = req.body;
    const orientation = await Orientation.findById(id);
    if (!orientation) {
      return res.json({ result: false, error: 'Orientation not found' });
    }
    res.json({ result: true, orientation });
  } catch (error) {
    console.error(error);
    res.json({ result: false, error: 'Failed to retrieve orientation' });
  }
});

// Route to update orientation

router.put('/orientations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const updatedOrientation = await Orientation.findByIdAndUpdate(
      id,
      { value },
      { new: true }
    );
    res.json({ result: true, orientation: updatedOrientation });
  } catch (error) {
    console.error(error);
    res.json({ result: false, error: 'Failed to update orientation' });
  }
});

module.exports = router;
