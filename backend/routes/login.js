// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

// // ...inside /register route after validation...
// let user = await User.findOne({ email });
// if (user) return res.status(400).json({ message: 'User already exists' });

// const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(password, salt);

// user = new User({ name, email, password: hashedPassword });
// await user.save();

// res.status(201).json({ message: 'User registered successfully' });