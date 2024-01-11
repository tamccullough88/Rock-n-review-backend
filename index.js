const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/users', userRoutes);

// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Add options
    .then(() => console.log('db connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

