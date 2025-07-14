import express from 'express';
import {
  initiateOtpVerification,
  verifyFirebaseOtp,
  getOtpVerificationStatus,
  revokeOtpVerification,
  verifySession,
  completeServiceWithOtp
} from '../controllers/firebaseOtpController.js';

const router = express.Router();

// Initialize OTP verification process
router.post('/initiate', initiateOtpVerification);

// Verify Firebase OTP token
router.post('/verify', verifyFirebaseOtp);

// Get OTP verification status
router.get('/status/:bookingId', getOtpVerificationStatus);

// Revoke OTP verification
router.delete('/revoke/:bookingId', revokeOtpVerification);

// Complete service with OTP verification
router.post('/complete/:bookingId', completeServiceWithOtp);

// Middleware to verify session (can be used by other routes)
router.use('/protected', verifySession);

export default router; 