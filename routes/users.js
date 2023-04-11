var express = require('express');
var router = express.Router();
require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// Route GET all users

router.get('/all', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ result: true, users: users });
  } catch (error) {
    res.json({result: false, error: "An error occurred while retrieving users" });
  }
});

// Route get one specficic user

router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({ result: true, user: user});
    } else {
      res.json({result: false, error: "User not found" });
    }
  } catch (error) {
    res.json({ error: "An error occurred while retrieving the user" });
  }
});



// SiGN UP

router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['username', 'password', 'email'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

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

// SIGN IN

router.post('/signin', (req, res) => {
  console.log(req.body)
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
router.delete('/delete/all', (req, res) => {
  User.deleteMany({})
  .then(data => {
    if (data) {
      res.json({ result: true, message: "Collection users successfully deleted"});
    } else {
      res.json({ result: false, error: "Failed to delete collection users"});
    }
  })
});


// Delete one speficied user from the database 

router.delete('/delete/:token', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ token: req.params.token});
    if (user) {
      res.json({ result: true, message: "User successfully deleted"});
    } else {
      res.json({ result: false, error: "Failed to delete user"});
    }
  } catch (error) {
    res.json({ result: false, error: "An error occurred while deleting the user"});
  }
});

module.exports = router;
