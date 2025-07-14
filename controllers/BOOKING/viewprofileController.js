// import User1 from '../models/User1.js'; // Adjust the path based on your project structure

// export const viewprofile = async (req, res) => {
//   try {
//     const { mobileNumber } = req.params;
//     const user = await User1.findOne({ mobileNumber }).select(
//       'fullName addressLine1 city state email emergencyContactNumber gender height weight age bloodGroup disease diseases'
//     );

//     // Log the retrieved user details
//     console.log('Retrieved user details:', JSON.stringify(user, null, 2));

//     // Check if the user was found
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to retrieve user details',
//       error: error.message,
//     });
//   }
// };


// userController.js

// import User1 from '../../models/BOOKING/User1.js'; // Adjust the path based on your project structure
import User1 from  '../../models/BOOKING/User1.js';
export const viewprofile = async (req, res) => {
  try {
    const User = User1(req.conn2);
    const { mobileNumber } = req.params;
    const user = await User.findOne({ mobileNumber }).select(
      'mobileNumber fullName addressLine1  city state email emergencyContactNumber gender height weight age bloodGroup disease diseases'
    );

    // Log the retrieved user details
    console.log('Retrieved user details:', JSON.stringify(user, null, 2));

    // Check if the user was found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve user details',
      error: error.message,
    });
  }
};