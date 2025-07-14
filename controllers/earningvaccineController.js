// import mongoose from 'mongoose';
// import User from '../models/User.js';
// import UserBookingMd from '../models/BookingforUrgent.js'; // Adjust the import according to your actual model file
// import UserBookingVd from '../models/BookingforUrgent2.js'; // Adjust the import according to your actual model file
// import Earning from '../models/Earning.js';

// export const getEarnings = async (req, res) => {
//   const { phoneNumber } = req.body;
//   console.log(phoneNumber);

//   try {
//     const user = await User.findOne({ mobile: phoneNumber });
//     if (!user) {
//       console.log('Alert: User not found');
//       return res.status(404).send('User not found');
//     }

//     const handleUserBookings = async (BookingModel) => {
//       const userBookings = await BookingModel.findOne({ userId: user._id }).populate('userId');
//       if (!userBookings) {
//         console.log('Alert: No bookings found for this user');
//         return { totalCompletedBookings: 0, totalEarnings: 0 };
//       }

//       const completedBookings = userBookings.bookings.filter(booking => booking.status === 'Completed');
//       const totalCompletedBookings = completedBookings.length;
//       const totalEarnings = completedBookings.reduce((sum, booking) => sum + booking.charges, 0);

//       return { totalCompletedBookings, totalEarnings };
//     };

//     // Handle UserBookingMd
//     const mdBookingsResult = await handleUserBookings(UserBookingMd);
//     // Handle UserBookingVd
//     const vdBookingsResult = await handleUserBookings(UserBookingVd);

//     const totalCompletedBookings = mdBookingsResult.totalCompletedBookings + vdBookingsResult.totalCompletedBookings;
//     const totalEarnings = mdBookingsResult.totalEarnings + vdBookingsResult.totalEarnings;

//     // Fetch the current earning document
//     let earning = await Earning.findOne({ userId: user._id });

//     if (!earning) {
//       // If no earning document exists, create a new one
//       earning = new Earning({
//         userId: user._id,
//         totalCompletedBookings,
//         totalEarnings,
//         availableBalance: totalEarnings
//       });
//     } else {
//       // If earning document exists, update it
//       const earningIncrease = totalEarnings - earning.totalEarnings;
//       earning.totalCompletedBookings = totalCompletedBookings;
//       earning.totalEarnings = totalEarnings;
//       earning.availableBalance += earningIncrease;
//     }

//     // Save the updated or new earning document
//     await earning.save();

//     res.json({
//       totalCompletedBookings: earning.totalCompletedBookings,
//       totalEarnings: earning.totalEarnings,
//       availableBalance: earning.availableBalance
//     });
//   } catch (error) {
//     console.log('Alert: Server error', error.message);
//     res.status(500).send(error);
//   }
// };


//updated code pharmacy from lab help 
import createEarning from '../models/Earningvaccine.js';
// import createLab from "../models/MedicineModel.js"; // Adjust the path based on your project structure
import createLab from "../models/vaccination.js"; // Adjust the path based on your project structure


export const getEarnings = async (req, res) => {
  const LabModel = createLab(req.conn2);
  const Earning = createEarning(req.conn1);

  try {
    // const { labownermobile } = req.body; // Extract labownermobile from the request body
    const {phoneNumber} = req.body;
    const labownermobile = phoneNumber
    console.log(`Fetching earnings for lab owner mobile: ${labownermobile}`);

    // Find bookings where labownermobile matches and status is completed
    const labs = await LabModel.find({}); // Retrieve all labs

    // Filter and flatten the completed bookings
    const completedBookings = labs.reduce((acc, lab) => {
      const labCompletedBookings = lab.bookings.filter(booking => 
        booking.labownermobile === labownermobile && booking.status === 'completed'
      );
      return acc.concat(labCompletedBookings || []);
    }, []);

    // console.log(completedBookings);

    if (!completedBookings.length) {
      return res.status(404).json({ message: 'No completed bookings found for this lab owner.' });
    }

    // Calculate total completed bookings and earnings safely
    const totalCompletedBookings = completedBookings.length;
    console.log(totalCompletedBookings)
    // const totalEarnings = completedBookings.reduce((sum, booking) => {
    //   // Ensure booking.charges is a number, default to 0 if not
    //   const charges = typeof booking.charges === 'number' && booking.charges > 0 ? booking.charges : 0;
    //   return sum + charges;
    // }, 0);

const totalEarnings = completedBookings.reduce((sum, booking) => {
  const dhaCharge = booking.dhaCharge || 0; // Ensure dhaCharge is a number
  return sum + dhaCharge;
}, 0);

    // Fetch the current earning document
    let earning = await Earning.findOne({ labownermobile });

    if (!earning) {
      // If no earning document exists, create a new one
      earning = new Earning({
        labownermobile,
        totalCompletedBookings,
        totalEarnings,
        availableBalance: totalEarnings // Initially, available balance is the same as total earnings
      });
    } else {
      // If earning document exists, update it
      const earningIncrease = totalEarnings - earning.totalEarnings;
      earning.totalCompletedBookings = totalCompletedBookings;
      earning.totalEarnings = totalEarnings;
      earning.availableBalance += earningIncrease;
    }

    // Save the updated or new earning document
    await earning.save();

    res.json({
      totalCompletedBookings: earning.totalCompletedBookings,
      totalEarnings: earning.totalEarnings,
      availableBalance: earning.availableBalance
    });
  } catch (error) {
    console.log('Alert: Server error', error.message);
    res.status(500).send(error);
  }
};
