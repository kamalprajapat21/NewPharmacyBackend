// // import crypto from 'crypto';
// // import User from '../models/User.js';

// // const generateOtp = () => {
// //   return crypto.randomInt(1000, 9999).toString();
// // };

// // const sendOtp = async (req, res) => {
// //   try {
// //     const { phoneNumber } = req.body;
// //     console.log('Received request to send OTP to:', phoneNumber);
    
// //     const existingUser = await User.findOne({ mobile: phoneNumber, signupStatus: true });
// //     if (existingUser) {
// //       console.log('User already exists:', existingUser);
// //       return res.status(409).json({ message: 'User already exists. Please login.' });
// //     }

// //     const otp = generateOtp();
// //     console.log('Generated OTP:', otp);
    
// //     const user = await User.findOneAndUpdate(
// //       { mobile: phoneNumber },
// //       { otpSignup: otp },
// //       { upsert: true, new: true }
// //     );
// //     console.log('User updated/created with OTP:', user);
    
// //     res.status(200).json({ otp, createdAt: new Date() });
// //   } catch (err) {
// //     console.error('Error during OTP generation:', err);
// //     res.status(500).json({ msg: 'Error during OTP generation', error: err.message });
// //   }
// // };

// // const checkOtp = async (req, res) => {
// //   try {
// //     const { phoneNumber, otp } = req.body;
// //     console.log('Received request to check OTP for:', phoneNumber);
    
// //     const user = await User.findOne({ mobile: phoneNumber });
// //     if (!user) {
// //       console.log('User not found for phone number:', phoneNumber);
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     if (user.otpSignup !== otp) {
// //       console.log('Invalid OTP for user:', user);
// //       return res.status(400).json({ message: 'Invalid OTP' });
// //     }

// //     await User.findOneAndUpdate(
// //       { mobile: phoneNumber },
// //       { $unset: { otpSignup: 1 }, signupStatus: true }
// //     );
// //     console.log('OTP verified and user updated for phone number:', phoneNumber);
    
// //     res.status(200).json({ message: 'OTP verified successfully.' });
// //   } catch (error) {
// //     console.error('Error during OTP verification:', error);
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// // export { sendOtp, checkOtp };





// // import createUserModel from '../models/User.js';

// // export const checkuserexistance = async (req, res) => {
// //   try {
// //     const User = createUserModel(req.conn1);
// //     const { phoneNumber } = req.body;
// //     console.log('Received request to send OTP to:', phoneNumber);

// //     // Check if the user already exists
// //     const existingUser = await User.findOne({ mobile: phoneNumber });
// //     if (existingUser) {
// //       console.log(existingUser);
// //       console.log('User already exists:', existingUser);
// //       return res.status(409).json({ message: 'User already exists. Please login.123456' });
// //     }

// //     // If user does not exist, create a new one
// //     const user = await User.create({ mobile: phoneNumber });
// //     console.log('New user created:', user);
    
// //     return res.status(201).json({ message: 'User created successfully', user });
// //   } catch (err) {
// //     console.error('Error during user creation:', err);
// //     res.status(500).json({ msg: 'Error during user creation', error: err.message });
// //   }
// // };



// import createUserModel from '../models/User.js';
// import { normalizeMobileNumber } from '../utils/helpers.js';

// // export const checkuserexistance = async (req, res) => {
// //   try {
// //     const User = createUserModel(req.conn1);
// //     const { phoneNumber } = req.body;
// //     console.log('Received request to send OTP to:', phoneNumber);

// //     const existingUser = await User.findOne({ mobile: phoneNumber });
// //     if (existingUser) {
// //       console.log('User already exists:', existingUser);
// //       return res.status(200).json({ userExists: true });
// //     }

// //     const user = await User.create({ mobile: phoneNumber });
// //     console.log('New user created:', user);

// //     return res.status(200).json({ userExists: false, user });
// //   } catch (err) {
// //     console.error('Error during user creation:', err);
// //     res.status(500).json({ msg: 'Error during user creation', error: err.message });
// //   }
// // };



// export const checkuserexistance = async (req, res) => {
//   try {
//     console.log('checkuserexistance - Request body:', req.body);
//     const User = createUserModel(req.conn1);
//     let { phoneNumber } = req.body;
//     console.log('Received request to check user existence for:', phoneNumber);

//     // Normalize phone number format
//     phoneNumber = normalizeMobileNumber(phoneNumber);
//     console.log('Normalized phone number:', phoneNumber);

//     const existingUser = await User.findOne({ mobile: phoneNumber });
//     if (existingUser) {
//       console.log('User already exists:', existingUser);
//       return res.status(200).json({ userExists: true });
//     }

//     const user = await User.create({ mobile: phoneNumber });
//     console.log('New user created:', user);

//     return res.status(200).json({ userExists: false, user });
//   } catch (err) {
//     console.error('Error during user creation:', err);
//     res.status(500).json({ msg: 'Error during user creation', error: err.message });
//   }
// };


import createUserModel from '../models/User.js';
import { normalizeMobileNumber } from '../utils/helpers.js';

/**
 * Signup controller:
 * - If user exists → return userExists: true
 * - Else → create new user and return userExists: false
 */
export const checkUserExistanceForSignup = async (req, res) => {
  try {
    console.log('Signup - Request body:', req.body);
    const User = createUserModel(req.conn1);
    let { phoneNumber } = req.body;

    phoneNumber = normalizeMobileNumber(phoneNumber);
    console.log('Normalized phone number:', phoneNumber);

    const existingUser = await User.findOne({ mobile: phoneNumber });
    if (existingUser) {
      console.log('User already exists for signup:', existingUser);
      return res.status(200).json({ userExists: true });
    }

    const newUser = await User.create({ mobile: phoneNumber });
    console.log('New user created during signup:', newUser);

    return res.status(200).json({ userExists: false, user: newUser });
  } catch (err) {
    console.error('Error during signup user creation:', err);
    res.status(500).json({ msg: 'Error during user creation', error: err.message });
  }
};

/**
 * Login controller:
 * - If user exists → return message: 'Login successful'
 * - Else → return message: 'User not found'
 */
export const checkUserExistanceForLogin = async (req, res) => {
  try {
    console.log('Login - Request body:', req.body);
    const User = createUserModel(req.conn1);
    let { phoneNumber } = req.body;

    phoneNumber = normalizeMobileNumber(phoneNumber);
    console.log('Normalized phone number:', phoneNumber);

    const existingUser = await User.findOne({ mobile: phoneNumber });
    if (existingUser) {
      console.log('User exists for login:', existingUser);
      return res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('User not found during login');
      return res.status(200).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error checking user existence for login:', err);
    res.status(500).json({ msg: 'Error checking user existence', error: err.message });
  }
};
