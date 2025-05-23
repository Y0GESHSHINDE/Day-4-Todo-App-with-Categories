const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
   const { name, email, password } = req.body;
   try {
      const isUserexits = User.findOne({ email });
      if (isUserexits) {
         res.status(201).json({ "Error": "user allredy exist" });
      }

      const hashedPassword = bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ msg: 'User registered successfully' });
   } catch (err) {
      res.status(500).json({ "error": err });
   }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Email not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Password does not match');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    console.log('✅ Logged in');
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
