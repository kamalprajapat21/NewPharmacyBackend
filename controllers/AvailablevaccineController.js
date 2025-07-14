// import Earning from '../models/Earning.js';
// import User from '../models/User.js';

// export const getAvailable = async (req, res) => {
//   const { phoneNumber } = req.body; 

//   try {
//     const user = await User.findOne({ mobile: phoneNumber });
//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     const earning = await Earning.findOne({ userId: user._id });
//     if (!earning) {
//       return res.status(404).send('Earnings not found for user');
//     }

//     if (earning.bookingStatus === 'completed') {
//       if (!earning.availableBalance) {
//         earning.availableBalance = earning.totalEarnings;
//         await earning.save();
//       }
//     }

//     const { availableBalance, totalRedeemed } = earning;

//     res.json({
//       availableBalance,
//       totalRedeemed,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// };


import createEarning from '../models/Earningvaccine.js';

export const getAvailable = async (req, res) => {
  const Earning = createEarning(req.conn1);

  try {
    const {phoneNumber} = req.body;
    const labownermobile = phoneNumber

    console.log(`Fetching available balance for lab owner mobile: ${labownermobile}`);

    // Fetch the current earning document based on labownermobile
    const earning = await Earning.findOne({ labownermobile });

    if (!earning) {
      return res.status(404).json({ message: 'No earning record found for this lab owner.' });
    }

    

    // Return the available balance
    res.json({
      labownermobile,
      availableBalance: earning.availableBalance,
      totalRedeemed: earning.totalRedeemed
    });
  } catch (error) {
    console.log('Alert: Server error', error.message);
    res.status(500).send(error);
  }
};


