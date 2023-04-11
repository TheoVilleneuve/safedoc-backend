var express = require('express');
var router = express.Router();
require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



router.post('/signup', (req, res) => {
  // // if (!checkBody(req.body, ['username', 'password', 'email', 'city', 'orientation', 'gender', 'doctor'])) {
  //   res.json({ result: false, error: 'Missing or empty fields' });
  //   return;
  // }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        city: req.body.city,
        orientation: req.body.orientation,
        gender: req.body.gender,
        doctor: req.body.doctor,
        token: uid2(32),
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      }).catch(error => {
        console.error(error);
        res.json({ result: false, error: 'Error saving user data' });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  }).catch(error => {
    console.error(error);
    res.json({ result: false, error: 'Error checking user data' });
  });
});



router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['usernameOrEmail', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  const { usernameOrEmail, password } = req.body;
  User.findOne({
    $or: [
      { username: usernameOrEmail },
      { email: usernameOrEmail }
    ]
  }).then(data => {
    if (data && bcrypt.compareSync(password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});


// to create 10 users
router.post('/create', (req, res) => {
  for (let i = 1; i <= 10; i++) {
    const newUser = new User({
      username: `user${i}`,
      password: `password${i}`,
      email: `user${i}@example.com`,
      city: 'New York',
      orientation: 'heterosexual',
      gender: 'male',
      token: 'abc123',
      doctor: 'Dr. Smith',
    });

    // Save the new user to the database
    newUser.save();

  }
});

// delete the user database
router.delete('/delete-users', (req, res) => {
  User.deleteMany();
});



module.exports = router;
