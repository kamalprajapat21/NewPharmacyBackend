import express from 'express';
import {
  createBooking,
  getBookingsByUserId,
  updateBookingStatus,
  deleteBooking
} from '../controllers/userBookingsControllersd.js';

const router = express.Router();

// Create a new booking for a user
router.post('/bookings', createBooking);

// Get all bookings for a user by user ID
router.get('/bookings/:userId', getBookingsByUserId);

// Update booking status
router.put('/bookings/status', updateBookingStatus);

// Delete a booking
router.delete('/bookings/:userId/:bookingId', deleteBooking);

export default router;
