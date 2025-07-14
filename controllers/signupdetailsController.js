// import multer from 'multer';
// import path from 'path';
// import User from '../models/User.js'
// import User1 from '../models/User1.js';
// import mongoose from 'mongoose';
// import Grid from 'gridfs-stream';
// import { GridFsStorage } from 'multer-gridfs-storage';


 
//   export const Signup1 = async (req, res) => {
//     try {
//       const { fullName, pharmacyName, pharmacyAddress1, pharmacyAddress2, city, state, mobileNumber } = req.body;
//       const pharmacyPhoto = req.file ? req.file.filename : null;
//       const mobile = String(mobileNumber).trim();
  
//       let user = await User.findOne({ mobile });
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       let user1 = await User1.findOne({ mobile });
  
//       if (!user1) {
//         user1 = new User1({ mobile });
//       }
  
//       user1.fullName = fullName;
//       user1.pharmacyName = pharmacyName;
//       user1.pharmacyAddress1 = pharmacyAddress1;
//       user1.pharmacyAddress2 = pharmacyAddress2;
//       user1.city = city;
//       user1.state = state;
//       user1.pharmacyPhoto = pharmacyPhoto;
//       user1.signupStep = 1;
  
//       await user1.save();
  
    
//       if (user.User1 && !user.User1.includes(user1._id)) {
//         user.User1.push(user1._id);
//         await user.save();
//       }
  
//       res.status(200).json({ message: 'Step 1 completed successfully' });
//     } catch (error) {
//       console.error('Error in step 1:', error);
//       res.status(500).json({ message: 'Error in step 1', error: error.message });
//     }
//   };
  
  
//   export const Signup2 = async (req, res) => {
//     try {
//       const { mobileNumber } = req.body;
//       const mobile = String(mobileNumber).trim();
  
//       let user1 = await User1.findOne({ mobile });
//       if (!user1) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       for (const [key, value] of Object.entries(req.files)) {
//         user1[key] = value[0].filename;
//       }
  
//       user1.signupStep = 2;
//       await user1.save();
//       res.status(200).json({ message: 'Step 2 completed successfully' });
//     } catch (error) {
//       console.error('Error in step 2:', error);
//       res.status(500).json({ message: 'Error in step 2', error: error.message });
//     }
//   };
  
//   // Signup Step 3
// export const Signup3 = async (req, res) => {
//     try {
//       const { bankName, accountNumber, ifscCode, mobileNumber } = req.body;
//       const mobile = String(mobileNumber).trim();
//       const uploadbankstatement = req.file ? req.file.filename : null;
  
//       let user1 = await User1.findOne({ mobile });
//       if (!user1) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       user1.bankName = bankName;
//       user1.accountNumber = accountNumber;
//       user1.ifscCode = ifscCode;
//       user1.uploadbankstatement = uploadbankstatement;
//       user1.signupStep = 3;
//       user1.signupCompleted = true;
  
//       await user1.save();
//       res.status(200).json({ message: 'Signup completed successfully' });
//     } catch (error) {
//       console.error('Error in step 3:', error);
//       res.status(500).json({ message: 'Error in step 3', error: error.message });
//     }
//   };
  


//modified
//working with atlas gridFS storage
//signupdetailsController.js
import multer from 'multer';
import path from 'path';
import createUser from '../models/User.js'
import createUser1 from '../models/User1.js';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import { GridFsStorage } from 'multer-gridfs-storage';
import { normalizeMobileNumber } from '../utils/helpers.js';
 


  export const Signup1 = async (req, res) => {
    try {
      console.log('Signup1 - Request body:', req.body);
      console.log('Signup1 - Request file:', req.file);
      
      const User = createUser(req.conn1);
      const User1 = createUser1(req.conn1);
      const { fullName, pharmacyName, pharmacyAddress1, pharmacyAddress2, city, state, mobileNumber } = req.body;
      const pharmacyPhoto = req.file ? req.file.filename : null;
      let mobile = normalizeMobileNumber(mobileNumber);
      
      console.log('Signup1 - Processed mobile number:', mobile);
  
      let user = await User.findOne({ mobile });
      
      console.log('Signup1 - Found user:', user ? 'Yes' : 'No');
  
      if (!user) {
        console.log('Signup1 - User not found for mobile:', mobile);
        return res.status(404).json({ message: 'User not found' });
      }
  
      let user1 = await User1.findOne({ mobile });
  
      if (!user1) {
        user1 = new User1({ mobile });
      }
  
      user1.fullName = fullName;
      user1.pharmacyName = pharmacyName;
      user1.pharmacyAddress1 = pharmacyAddress1;
      user1.pharmacyAddress2 = pharmacyAddress2;
      user1.city = city;
      user1.state = state;
      user1.pharmacyPhoto = pharmacyPhoto;
      user1.signupStep = 1;
  
      await user1.save();
  
      // Update the User schema with the User1 reference
      // Check if user.User1 is defined and includes user1._id
      if (user.User1 && !user.User1.includes(user1._id)) {
        user.User1.push(user1._id);
        await user.save();
      }
  
      res.status(200).json({ message: 'Step 1 completed successfully' });
    } catch (error) {
      console.error('Error in step 1:', error);
      res.status(500).json({ message: 'Error in step 1', error: error.message });
    }
  };
  
  
  // Signup Step 2
  export const Signup2 = async (req, res) => {
    try {
      const User = createUser(req.conn1);
      const User1 = createUser1(req.conn1);
      const { mobileNumber } = req.body;
      let mobile = normalizeMobileNumber(mobileNumber);
  
      let user1 = await User1.findOne({ mobile });
      if (!user1) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      for (const [key, value] of Object.entries(req.files)) {
        user1[key] = value[0].filename;
      }
  
      user1.signupStep = 2;
      await user1.save();
      res.status(200).json({ message: 'Step 2 completed successfully' });
    } catch (error) {
      console.error('Error in step 2:', error);
      res.status(500).json({ message: 'Error in step 2', error: error.message });
    }
  };
  
  // Signup Step 3
export const Signup3 = async (req, res) => {
    try {
      const User = createUser(req.conn1);
      const User1 = createUser1(req.conn1);
      const { bankName, accountNumber, ifscCode, mobileNumber } = req.body;
      let mobile = normalizeMobileNumber(mobileNumber);
      const uploadbankstatement = req.file ? req.file.filename : null;
  
      let user1 = await User1.findOne({ mobile });
      if (!user1) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user1.bankName = bankName;
      user1.accountNumber = accountNumber;
      user1.ifscCode = ifscCode;
      user1.uploadbankstatement = uploadbankstatement;
      user1.signupStep = 3;
      user1.signupCompleted = true;
  
      await user1.save();
      res.status(200).json({ message: 'Signup completed successfully' });
    } catch (error) {
      console.error('Error in step 3:', error);
      res.status(500).json({ message: 'Error in step 3', error: error.message });
    }
  };
  