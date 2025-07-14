// routes/bookingRoutes.js
import express from 'express';
import {
  createBookingUrgent,
  getAllIncoming,
  getAllPending,
  getAllCompleted,
  completeBooking,
  
  
} from '../controllers/bookingController.js';
import { acceptBooking,rejectBooking } from '../controllers/bookingController.js';
// import { createBookingStandalone } from '../controllers/bookingserviceController.js';
import { getUrgentBookings } from '../controllers/bookingserviceController.js';

const router = express.Router();

// Route for BookingStandalone'/api/booking/incoming
// router.post('/standalone', createBookingStandalone);
// router.get('/standalone', getAllBookingStandalone);

// Route for BookingforUrgent
router.post('/create', createBookingUrgent);
// router.post('/create2', getUrgentBookings);
router.post('/incoming', getAllIncoming);
router.post('/pending', getAllPending);
// router.post('/completed', getAllCompleted);
router.post('/completed', getAllCompleted);

router.put('/booking/complete/:id', completeBooking);




// Route for Accept Reject
router.post('/:id/accept', acceptBooking);
router.post('/:id/reject', rejectBooking);



// router.post('/booking/:bookingId/accept', acceptBooking);
// router.post('/booking/:bookingId/reject', rejectBooking);

export default router;


