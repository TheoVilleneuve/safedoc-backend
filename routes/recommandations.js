const express = require('express');
const router = express.Router();
const Recommandation = require('../models/recommandations');

// Get all recommendations
router.get('/', async (req, res) => {
  try {
    const recommandations = await Recommandation.find();
    res.json({ result: true, length: recommandations.length, recommandations: recommandations });
  } catch (error) {
    res.json({ result: false, error: 'An error occurred while retrieving recommendations' });
  }
});

// Delete all recommendations
router.delete('/', async (req, res) => {
  try {
    const deleted = await Recommandation.deleteMany({});
    if (deleted) {
      res.json({ result: true, message: 'Recommendation collection successfully deleted' });
    } else {
      res.json({ result: false, error: 'Failed to delete collection Recommendation' });
    }
  } catch (error) {
    res.json({ result: false, error: 'An error occurred while deleting recommendations' });
  }
});

module.exports = router;
