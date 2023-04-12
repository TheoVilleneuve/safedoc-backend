var express = require('express');
var router = express.Router();
require('../models/connection');
const Orientation = require('../models/orientations');
const app = express();

// GET /orientations

router.get('/', (req,res) => {
  Orientation.find()
  .then(data => {
      res.json({result: true, orientations: data});
  })
})

// Route Post for orientations

// router.post('/orientations', async (req, res) => {
//   try {
//     const { id } = req.body;
//     const orientation = await Orientation.findById(id);
//     if (!orientation) {
//       return res.json({ result: false, error: 'Orientation not found' });
//     }
//     res.json({ result: true, orientation });
//   } catch (error) {
//     console.error(error);
//     res.json({ result: false, error: 'Failed to retrieve orientation' });
//   }
// });


module.exports = router;
