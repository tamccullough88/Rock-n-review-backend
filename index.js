require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/reviews');
const songReviewRoutes = require('./routes/reviewsS');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Validation middleware for user registration
app.use('/users/register', [
    body('name').notEmpty().isString(),
    body('userName').notEmpty().isString(),
    body('pass').notEmpty().isString(),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
});

// Routes
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);
app.use('/song-reviews', songReviewRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

