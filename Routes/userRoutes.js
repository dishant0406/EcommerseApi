const express = require('express');
const { verifyTokenAndAuth } = require('./verifyToken');
const User = require('../Models/userModel');
const router = express.Router()

router.put('/update/:id', verifyTokenAndAuth, async (req, res) => {

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
