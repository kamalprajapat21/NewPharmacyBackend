//backend/app.js
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/otp', require("./routes/otpRoutes"));
app.use('/api/firebase-otp', require("./routes/firebaseOtpRoutes"));

app.use(require('./middlewares/errorHandler'));

module.exports = app;
