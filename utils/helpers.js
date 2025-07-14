const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const generateRandomString = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

/**
 * Normalizes mobile number format for consistency across the application
 * @param {string} mobileNumber - The mobile number to normalize
 * @returns {string} - The normalized mobile number
 * 
 * Test cases:
 * normalizeMobileNumber('+919876543210') -> '+919876543210'
 * normalizeMobileNumber('919876543210') -> '+919876543210'
 * normalizeMobileNumber('9876543210') -> '+919876543210'
 * normalizeMobileNumber('+91 98765 43210') -> '+919876543210'
 * normalizeMobileNumber('91-98765-43210') -> '+919876543210'
 */
export const normalizeMobileNumber = (mobileNumber) => {
  if (!mobileNumber) return null;
  
  // Convert to string and trim
  let mobile = String(mobileNumber).trim();
  
  // Remove any non-digit characters except +
  let cleaned = mobile.replace(/[^\d+]/g, '');
  
  // If it starts with +91, keep it as is
  if (cleaned.startsWith('+91')) {
    return cleaned;
  }
  // If it starts with 91 (without +), add +
  else if (cleaned.startsWith('91')) {
    return '+' + cleaned;
  }
  // If it's a 10-digit number, add +91
  else if (cleaned.length === 10) {
    return '+91' + cleaned;
  }
  // Otherwise, keep as is
  else {
    return cleaned;
  }
};

export {
    formatDate,
    generateRandomString
};
