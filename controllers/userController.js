import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateDbName = async () => {
  const userCount = await User.countDocuments();
  return `booking${userCount + 1}`;
};

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, mobile, otp, createdBy, modifiedBy } = req.body;

  const userExists = await User.findOne({ mobile });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const bookingDbName = await generateDbName();

  const user = await User.create({
    firstName,
    lastName,
    mobile,
    otp,
    createdBy,
    modifiedBy,
    bookingDbName
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export { createUser, getUserById };
