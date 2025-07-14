import createLab from '../models/vaccination.js'; // Adjust the path based on your project structure
import mongoose from 'mongoose';
import crypto from 'crypto';
export const sendotp2 = async (req, res) => {
  try {
    const Lab = createLab(req.conn2); // Get the Lab model from the db connection
    const { labId } = req.params; // Get the booking ID from the request parameters
    const otp = crypto.randomInt(1000, 9999);
    // const lab = await Lab.findOne({ 'bookings.labId': labId });
    // const booking = lab.bookings.find(b => b.labId === labId);
    console.log("test1")
    // console.log(booking)
    console.log("test1")

    res.status(200).json({ message: 'OTP sent successfully', otp });

    //rajcode
// rajcode
  const booking = await Lab.findOneAndUpdate(
  { 'bookings.labId': labId },  // Find the booking with the specified labId
  { $set: { 'bookings.$.bookingOtp': otp } },  // Update the bookingOtp field for that booking
  { new: true }  // Return the updated document
);

    //rajcode
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message,
    });
  }
};


export const checkotp2 = async (req, res) => {
  try {
    const Lab = createLab(req.conn2);
    const { labId } = req.params;
    const { otp } = req.body;

    // Find the lab document that contains the booking with the given labId
    const lab = await Lab.findOne({ 'bookings.labId': labId });

    if (!lab) {
      return res.status(404).json({ success: false, message: 'Lab not found' });
    }

    // Find the booking by labId from the lab's bookings array
    const booking = lab.bookings.find(b => b.labId === labId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found in the lab' });
    }

    // Check if OTP was provided
    if (!otp) {
      return res.status(400).json({ success: false, message: 'Please enter OTP' });
    }

    // Check if the OTP matches
    if (booking.bookingOtp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // OTP is valid
    return res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error checking OTP:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify OTP',
      error: error.message,
    });
  }
};
