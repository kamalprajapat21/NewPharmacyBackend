// routes/bookingserviceRoutes.js
import express from 'express';
const router = express.Router();
import { getUrgentBookings2, getBookingById2, endService2 } from '../controllers/bookingserviceController2.js';

// GET all urgent bookings
router.get('/urgentall2', getUrgentBookings2);

//urgentall    axios.get('/api/booking/urgentall')

// GET booking by ID
router.get('/:id', getBookingById2);
router.post('/:id/endService2', endService2); // Add the new route
// router.post('/endService', endService); // Add the new route

export default router;
