// Firebase configuration for backend
import dotenv from 'dotenv';

dotenv.config();

export const firebaseConfig = {
  // Firebase project configuration
  projectId: process.env.FIREBASE_PROJECT_ID || 'dooper-india',
  
  // Service account configuration
  serviceAccount: {
    type: process.env.FIREBASE_TYPE || 'service_account',
    project_id: process.env.FIREBASE_PROJECT_ID || 'dooper-india',
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
    token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  },

  // reCAPTCHA Enterprise configuration
  recaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY || '6LdR0HorAAAAAJwUoJjTng-nGA4MkjgrDuCkocui',
    secretKey: process.env.RECAPTCHA_SECRET_KEY,
    enterprise: {
      projectId: process.env.RECAPTCHA_ENTERPRISE_PROJECT_ID,
      apiKey: process.env.RECAPTCHA_ENTERPRISE_API_KEY
    }
  },

  // Phone Auth configuration
  phoneAuth: {
    defaultCountry: process.env.DEFAULT_COUNTRY || 'IN',
    defaultNationalNumber: process.env.DEFAULT_NATIONAL_NUMBER || '+91',
    testPhoneNumbers: process.env.TEST_PHONE_NUMBERS?.split(',') || []
  },

  // Session configuration
  session: {
    cookieName: 'firebase-session',
    maxAge: 60 * 60 * 24 * 5 * 1000, // 5 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
};

// Validate required environment variables
export const validateFirebaseConfig = () => {
  const required = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_PRIVATE_KEY_ID',
    'FIREBASE_PRIVATE_KEY',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_CLIENT_ID'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn('Missing Firebase environment variables:', missing);
    console.warn('Firebase Admin SDK may not work properly without these variables.');
  }

  return missing.length === 0;
};

// Get Firebase Admin SDK configuration
export const getFirebaseAdminConfig = () => {
  const { serviceAccount } = firebaseConfig;
  
  // Check if all required fields are present
  const hasRequiredFields = serviceAccount.private_key_id && 
                           serviceAccount.private_key && 
                           serviceAccount.client_email;

  if (!hasRequiredFields) {
    throw new Error('Firebase service account configuration is incomplete. Please check your environment variables.');
  }

  return {
    credential: {
      type: serviceAccount.type,
      project_id: serviceAccount.project_id,
      private_key_id: serviceAccount.private_key_id,
      private_key: serviceAccount.private_key,
      client_email: serviceAccount.client_email,
      client_id: serviceAccount.client_id,
      auth_uri: serviceAccount.auth_uri,
      token_uri: serviceAccount.token_uri,
      auth_provider_x509_cert_url: serviceAccount.auth_provider_x509_cert_url,
      client_x509_cert_url: serviceAccount.client_x509_cert_url
    }
  };
};

export default firebaseConfig; 