import express from 'express';
import { viewprofile } from '../controllers/BOOKING/viewprofileController.js';

const router = express.Router();

// Route to get user details by mobile number
router.get('/:mobileNumber', viewprofile);

export default router;