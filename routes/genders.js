var express = require('express');
var router = express.Router();
require('../models/connection');
const Gender = require('../models/genders');
const app = express();

// GET /genders

router.get('/', (req,res) => {
  Gender.find()
  .then(data => {
      res.json({result: true, genders: data});
  })
})

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
