import express from 'express';
import {
  createBookingUrgent2,
  getAllIncoming2,
  getAllPending2,
  getAllCompleted2,
  completeBooking2,
  
  
} from '../controllers/bookingController2.js';
import { acceptBooking2,rejectBooking2 } from '../controllers/bookingController2.js';
// import { createBookingStandalone } from '../controllers/bookingserviceController.js';
import { getUrgentBookings2 } from '../controllers/bookingserviceController2.js';

const router = express.Router();

// Route for BookingStandalone'/api/booking/incoming
// router.post('/standalone', createBookingStandalone);
// router.get('/standalone', getAllBookingStandalone);

// Route for BookingforUrgent
router.post('/create2', createBookingUrgent2);
// router.post('/create2', getUrgentBookings);
router.post('/incoming2', getAllIncoming2);
router.post('/pending2', getAllPending2);
// router.post('/completed', getAllCompleted);
router.post('/completed2', getAllCompleted2);


router.put('/booking/complete2/:id', completeBooking2);




// Route for Accept Reject
router.post('/:id/accept2', acceptBooking2);
router.post('/:id/reject2', rejectBooking2);



// router.post('/booking/:bookingId/accept', acceptBooking);
// router.post('/booking/:bookingId/reject', rejectBooking);

export default router;


