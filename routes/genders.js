var express = require('express');
var router = express.Router();
require('../models/connection');
const Gender = require('../models/genders');
const app = express();

// Route to get all genders
router.get('/', async (req, res) => {
  try {
    const genders = await Gender.find();
    res.json({result : true, genders: genders});
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: false, error: 'Failed to retrieve genders' });
  }
});

// Route Post for Genders

router.post('/genders', async (req, res) => {
  try {
    const { id } = req.body;
    const gender = await Gender.findById(id);
    if(!gender){
      return res.json({ result: false, error: 'Gender not found' });
    }
    res.json({ result: true, gender: gender });
  } catch (err) {
    res.json({ result: false, error: 'Failed to retrieve gender' });
  }
});


module.exports = router;
