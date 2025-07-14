//backend/models/BookingforUrgent.js

import mongoose from 'mongoose';
//import UserBookings from '../models/BookingforUrgent.js';

const bookingSchema = new mongoose.Schema({
  bookingId: String,
  date: String,
  time: String,
  labTests: [String],
  patientName: String,
  address: String,
  charges: Number,
  status: {
    type: String,
    enum: ['pending', 'completed', 'reject','read', 'incoming'],
    default: 'incoming'
  }
});

const userBookingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookings: [bookingSchema]
});

const UserBookingMd= mongoose.model('UserBookingMd', userBookingsSchema);

export default UserBookingMd;
