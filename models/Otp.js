// backend/models/otp.js
import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // OTP expires in 5 minutes (300 seconds)
  },
  verifiedAt: {
    type: Date
  },
  startServiceAt: {
    type: Date
  }
});

const Otp = mongoose.model('Otp', OtpSchema);

export default Otp;
