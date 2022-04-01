const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const router = express.Router()

router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("username not available");
    }
    else if (user.password !== req.body.password) {
      res.status(401).json("password not valid");
    }
    else {
      const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
      },
        process.env.JWT_SECRET,
        { expiresIn: "3d" })

      const { password, ...details } = user._doc;
      res.status(200).json({ ...details, accessToken });
    }
  }
  catch (err) {
    res.status(500).json("error", err);
  }
})

module.exports = router;