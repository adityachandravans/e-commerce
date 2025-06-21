const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
dotenv.config();
const MONGO_URI = "mongodb://localhost:27017/hardware"; 
const app = express();
app.use(cors());
app.use(express.json());
console.log("MongoDB URI:", MONGO_URI); 
app.use('/api/users', userRoutes);
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
