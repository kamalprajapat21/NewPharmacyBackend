import admin from 'firebase-admin';
import createLab from '../models/MedicineModel.js';

// Initialize Firebase Admin SDK
// Note: You'll need to add your service account key file
// const serviceAccount = require('../config/firebase-service-account.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

class FirebaseOtpService {
  constructor() {
    // Initialize Firebase Admin if not already done
    if (!admin.apps.length) {
      try {
        // For development, you can use environment variables
        const serviceAccount = {
          type: process.env.FIREBASE_TYPE,
          project_id: process.env.FIREBASE_PROJECT_ID,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID,
          auth_uri: process.env.FIREBASE_AUTH_URI,
          token_uri: process.env.FIREBASE_TOKEN_URI,
          auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
        };

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
      } catch (error) {
        console.error('Firebase Admin initialization error:', error);
      }
    }
  }

  // Verify Firebase ID token
  async verifyIdToken(idToken) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return {
        success: true,
        uid: decodedToken.uid,
        phoneNumber: decodedToken.phone_number,
        user: decodedToken
      };
    } catch (error) {
      console.error('Error verifying ID token:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create custom token for client-side verification
  async createCustomToken(uid, additionalClaims = {}) {
    try {
      const customToken = await admin.auth().createCustomToken(uid, additionalClaims);
      return {
        success: true,
        customToken
      };
    } catch (error) {
      console.error('Error creating custom token:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Verify phone number with Firebase
  async verifyPhoneNumber(phoneNumber, sessionInfo) {
    try {
      // This would typically be done client-side, but we can verify the session
      const verificationCheck = await admin.auth().verifySessionCookie(sessionInfo);
      return {
        success: true,
        phoneNumber: verificationCheck.phone_number
      };
    } catch (error) {
      console.error('Error verifying phone number:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Store OTP verification in database
  async storeOtpVerification(bookingId, phoneNumber, verificationData) {
    try {
      const Lab = createLab(); // You'll need to pass the connection
      
      const booking = await Lab.findOneAndUpdate(
        { 'bookings.labId': bookingId },
        { 
          $set: { 
            'bookings.$.phoneNumber': phoneNumber,
            'bookings.$.firebaseVerification': verificationData,
            'bookings.$.otpVerified': true,
            'bookings.$.otpVerifiedAt': new Date()
          }
        },
        { new: true }
      );

      return {
        success: true,
        booking
      };
    } catch (error) {
      console.error('Error storing OTP verification:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get OTP verification status
  async getOtpVerificationStatus(bookingId) {
    try {
      const Lab = createLab(); // You'll need to pass the connection
      
      const lab = await Lab.findOne({ 'bookings.labId': bookingId });
      if (!lab) {
        return {
          success: false,
          error: 'Booking not found'
        };
      }

      const booking = lab.bookings.find(b => b.labId === bookingId);
      if (!booking) {
        return {
          success: false,
          error: 'Booking not found'
        };
      }

      return {
        success: true,
        otpVerified: booking.otpVerified || false,
        phoneNumber: booking.phoneNumber,
        verifiedAt: booking.otpVerifiedAt
      };
    } catch (error) {
      console.error('Error getting OTP verification status:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Revoke OTP verification
  async revokeOtpVerification(bookingId) {
    try {
      const Lab = createLab(); // You'll need to pass the connection
      
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

      return {
        success: true,
        booking
      };
    } catch (error) {
      console.error('Error revoking OTP verification:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate session cookie for persistent verification
  async createSessionCookie(idToken, expiresIn = 60 * 60 * 24 * 5 * 1000) { // 5 days
    try {
      const sessionCookie = await admin.auth().createSessionCookie(idToken, {
        expiresIn
      });
      return {
        success: true,
        sessionCookie
      };
    } catch (error) {
      console.error('Error creating session cookie:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Verify session cookie
  async verifySessionCookie(sessionCookie) {
    try {
      const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);
      return {
        success: true,
        claims: decodedClaims
      };
    } catch (error) {
      console.error('Error verifying session cookie:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Create and export singleton instance
const firebaseOtpService = new FirebaseOtpService();
export default firebaseOtpService; 