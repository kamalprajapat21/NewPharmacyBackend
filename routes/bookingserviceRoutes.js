// routes/bookingserviceRoutes.js
import express from 'express';
const router = express.Router();
import { getUrgentBookings, getBookingById, endService } from '../controllers/bookingserviceController.js';

// GET all urgent bookings
router.get('/urgentall', getUrgentBookings);

//urgentall    axios.get('/api/booking/urgentall')

// GET booking by ID
router.get('/:id', getBookingById);
router.post('/:id/endService', endService); // Add the new route
// router.post('/endService', endService); // Add the new route

export default router;
