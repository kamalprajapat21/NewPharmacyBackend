// backend/testingAPI/sendotp.js
const sendOtp = async (phoneNumber) => {
    const response = await fetch('/api/otp/send-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber })
    });
    const data = await response.json();
    return data.otp; 
};

const phoneNumber = '1234567890';
const otp = await sendOtp(phoneNumber);
console.log('OTP:', otp);
