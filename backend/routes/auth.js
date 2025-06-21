const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); // Correct import
const User = require('../models/User'); // Make sure this path is correct
const nodemailer = require('nodemailer');
// Register route
router.post('/register.html', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Create user (you might want to hash the password here)
    user = new User({
      name,
      email,
      password // In production, hash this password before saving
    });

    await user.save();

    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
 //otification email
//  const otp = generateOTP();
//   otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 min expiry

//   // Configure your transporter
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'chandravanshiaditya25@gmail.com', // <-- Replace with your Gmail
//       pass: 'Aditya@1687' // <-- Use App Password, not your Gmail password
//     }
//   });

//   try {
//     await transporter.sendMail({
//       from: 'chandravanshiaditya25@gmail.com',
//       to: email,
//       subject: 'Your OTP Code',
//       text: `Your OTP is: ${otp}`
//     });
//     res.json({ success: true, message: 'OTP sent' });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Failed to send OTP', error: err.message });
//   }

});

// module.exports = router;

module.exports = router;

