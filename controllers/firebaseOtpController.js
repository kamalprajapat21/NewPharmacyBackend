import firebaseOtpService from '../services/firebaseOtpService.js';
import createLab from '../models/MedicineModel.js';

// Send OTP using Firebase Phone Auth (client-side handles this)
export const initiateOtpVerification = async (req, res) => {
  try {
    const { bookingId, phoneNumber } = req.body;

    if (!bookingId || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID and phone number are required'
      });
    }

    // Store phone number in booking for verification
    const Lab = createLab(req.conn2);
    const booking = await Lab.findOneAndUpdate(
      { 'bookings.labId': bookingId },
      { 
        $set: { 
          'bookings.$.phoneNumber': phoneNumber,
          'bookings.$.otpInitiatedAt': new Date()
        }
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP verification initiated',
      phoneNumber,
      bookingId
    });

  } catch (error) {
    console.error('Error initiating OTP verification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate OTP verification',
      error: error.message
    });
  }
};

// Verify Firebase OTP token
export const verifyFirebaseOtp = async (req, res) => {
  try {
    const { bookingId, idToken } = req.body;

    if (!bookingId || !idToken) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID and Firebase ID token are required'
      });
    }

    // Verify the Firebase ID token
    const tokenVerification = await firebaseOtpService.verifyIdToken(idToken);
    
    if (!tokenVerification.success) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
        error: tokenVerification.error
      });
    }

    // Get booking details
    const Lab = createLab(req.conn2);
    const lab = await Lab.findOne({ 'bookings.labId': bookingId });
    
    if (!lab) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const booking = lab.bookings.find(b => b.labId === bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Verify phone number matches
    if (booking.phoneNumber !== tokenVerification.phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number mismatch'
      });
    }

    // Store verification data
    const verificationData = {
      uid: tokenVerification.uid,
      phoneNumber: tokenVerification.phoneNumber,
      verifiedAt: new Date(),
      tokenVerified: true
    };

    const updatedBooking = await Lab.findOneAndUpdate(
      { 'bookings.labId': bookingId },
      { 
        $set: { 
          'bookings.$.firebaseVerification': verificationData,
          'bookings.$.otpVerified': true,
          'bookings.$.otpVerifiedAt': new Date()
        }
      },
      { new: true }
    );

    // Create session cookie for persistent verification
    const sessionCookie = await firebaseOtpService.createSessionCookie(idToken);
    
    if (sessionCookie.success) {
      // Set session cookie
      res.cookie('session', sessionCookie.sessionCookie, {
        maxAge: 60 * 60 * 24 * 5 * 1000, // 5 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      user: {
        uid: tokenVerification.uid,
        phoneNumber: tokenVerification.phoneNumber
      },
      bookingId
    });

  } catch (error) {
    console.error('Error verifying Firebase OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify OTP',
      error: error.message
    });
  }
};

// Get OTP verification status
export const getOtpVerificationStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    const Lab = createLab(req.conn2);
    const lab = await Lab.findOne({ 'bookings.labId': bookingId });
    
    if (!lab) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const booking = lab.bookings.find(b => b.labId === bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      otpVerified: booking.otpVerified || false,
      phoneNumber: booking.phoneNumber,
      verifiedAt: booking.otpVerifiedAt,
      firebaseVerification: booking.firebaseVerification
    });

  } catch (error) {
    console.error('Error getting OTP verification status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get verification status',
      error: error.message
    });
  }
};

// Revoke OTP verification
export const revokeOtpVerification = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    const Lab = createLab(req.conn2);
    const booking = await Lab.findOneAndUpdate(
      { 'bookings.labId': bookingId },
      { 
        $unset: { 
          'bookings.$.otpVerified': 1,
          'bookings.$.otpVerifiedAt': 1,
          'bookings.$.firebaseVerification': 1
        }
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Clear session cookie
    res.clearCookie('session');

    res.status(200).json({
      success: true,
      message: 'OTP verification revoked successfully'
    });

  } catch (error) {
    console.error('Error revoking OTP verification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to revoke verification',
      error: error.message
    });
  }
};

// Verify session cookie middleware
export const verifySession = async (req, res, next) => {
  try {
    const sessionCookie = req.cookies.session || '';

    if (!sessionCookie) {
      return res.status(401).json({
        success: false,
        message: 'No session found'
      });
    }

    const sessionVerification = await firebaseOtpService.verifySessionCookie(sessionCookie);
    
    if (!sessionVerification.success) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session',
        error: sessionVerification.error
      });
    }

    req.user = sessionVerification.claims;
    next();

  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(401).json({
      success: false,
      message: 'Session verification failed',
      error: error.message
    });
  }
};

// Complete service after OTP verification
export const completeServiceWithOtp = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    // Verify session first
    const sessionCookie = req.cookies.session || '';
    if (!sessionCookie) {
      return res.status(401).json({
        success: false,
        message: 'OTP verification required'
      });
    }

    const sessionVerification = await firebaseOtpService.verifySessionCookie(sessionCookie);
    if (!sessionVerification.success) {
      return res.status(401).json({
        success: false,
        message: 'Invalid OTP verification'
      });
    }

    // Get booking and verify OTP status
    const Lab = createLab(req.conn2);
    const lab = await Lab.findOne({ 'bookings.labId': bookingId });
    
    if (!lab) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const booking = lab.bookings.find(b => b.labId === bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (!booking.otpVerified) {
      return res.status(400).json({
        success: false,
        message: 'OTP verification required before completing service'
      });
    }

    // Complete the service
    const updatedBooking = await Lab.findOneAndUpdate(
      { 'bookings.labId': bookingId },
      { 
        $set: { 
          'bookings.$.status': 'completed',
          'bookings.$.completedAt': new Date(),
          'bookings.$.completedWithOtp': true
        }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Service completed successfully with OTP verification',
      booking: updatedBooking
    });

  } catch (error) {
    console.error('Error completing service with OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete service',
      error: error.message
    });
  }
}; 