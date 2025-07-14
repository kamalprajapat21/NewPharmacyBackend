import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

const verifyOTP = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body;

  const user = await User.findOne({ mobile, otp });

  if (!user) {
    res.status(401).json({ message: 'Invalid OTP' });
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d', 
  });

  res.status(200).json({
    token,
    user: {
      _id: user._id,
      mobile: user.mobile,
      firstName: user.firstName, 
      lastName: user.lastName,
    },
  });
});

export { verifyOTP };
