// backend/services/otpService.js
import Otp from '../models/Otp.js';
import crypto from 'crypto';

const generateOtp = async (phoneNumber) => {
    const otp = crypto.randomInt(1000, 9999).toString();
    const otpEntry = new Otp({ phoneNumber, otp });
    await otpEntry.save();
    return { otp, createdAt: otpEntry.createdAt };
};

const verifyOtp = async (phoneNumber, otp) => {
    const otpEntry = await Otp.findOne({ phoneNumber, otp });
    return otpEntry !== null;
};

const getOtp = async (phoneNumber) => {
    const otpEntry = await Otp.findOne({ phoneNumber });
    return otpEntry ? otpEntry.otp : null;
};

const startService = async (phoneNumber) => {
    const otpEntry = await Otp.findOne({ phoneNumber });
    if (otpEntry) {
        const now = new Date();
        otpEntry.startServiceAt = now;
        await otpEntry.save();
        return now;
    }
    return null;
};

export { generateOtp, verifyOtp, getOtp, startService };
