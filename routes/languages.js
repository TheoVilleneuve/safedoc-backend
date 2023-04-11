var express = require('express');
var router = express.Router();
require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const Languages = require('../models/languages');



router.get('/languages', async (req, res) => {
  try {
    const languages = await Languages.find();
    res.json({result: true, languages: languages});
  } catch (error) {
    res.status(500).json({ result: false, error: "An error occurred while retrieving languages" });
  }
});
