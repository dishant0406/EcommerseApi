const express = require('express');
const Product = require('../Models/productModel');
const { verifyTokenAndAdmin } = require('./verifyToken');
const router = express.Router()

//POST PRODUCT

router.post('/productentery', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();

    res.status(200).json(savedProduct);
  }
  catch (err) {
    res.status(403).json(err);
  }
})

//UPDATE PRODUCT

router.put('/update/:id', verifyTokenAndAdmin, async (req, res) => {

  try {
    const updatedProduct = await User.findByIdAndUpdate(req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//DELETE PRODUCT

router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  }
  catch (err) {
    res.status(500).json(err);
  }
})

router.get('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { password, ...otherDetails } = product._doc;
    res.status(200).json(otherDetails);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//GET ALL USERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;