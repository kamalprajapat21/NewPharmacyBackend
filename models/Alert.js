// backend/models/Alert.js

import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'unread' },
  type: { type: String, enum: ['Medicine', 'Vaccination'] }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  visible: { type: Boolean, default: true }
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;
