// import Earning from '../models/Earning.js';
// import User from '../models/User.js';

// export const updateWithdrawStatus = async (req, res) => {
//   const { phoneNumber, amount } = req.body;
//   const status = "yes";
  
//   try {
//     const user = await User.findOne({ mobile: phoneNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const earning = await Earning.findOne({ userId: user._id });
//     if (!earning) {
//       return res.status(404).json({ message: 'Earning record not found' });
//     }

//     console.log(earning.availableBalance);
//     console.log(amount);

//     if (status === 'yes') {
//       if (earning.availableBalance - amount < 100) {
//         return res.status(400).json({ message: 'Insufficient balance' });
//       }
      
//       earning.withdrawRequest = amount;
//       earning.availableBalance -= amount;
//       earning.totalRedeemed += amount;
//       earning.status = status;

//       await earning.save();

//       return res.status(200).json({ message: 'Status updated successfully', earning });
//     }
    
//     res.status(400).json({ message: 'Invalid request' });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



import createEarning from '../models/Earning.js';
// import User from '../models/User.js';

export const updateWithdrawStatus = async (req, res) => {

  const Earning = createEarning(req.conn1);


  const { phoneNumber, amount } = req.body;
  const labownermobile = phoneNumber

  try {
  const earning = await Earning.findOne({ labownermobile });
  const status = "yes";
    if (!earning) {
      return res.status(404).json({ message: 'Earning record not found' });
    }
    console.log(earning.availableBalance);
    console.log(amount);
    if (status === 'yes') {
      if (earning.availableBalance <= 1 || earning.availableBalance < amount || earning.availableBalance === amount) {
        return res.status(400).json({ message: 'Insufficient balance or balance equal to withdraw amount' });
      }
      earning.withdrawRequest = amount;
      earning.availableBalance -= amount;
      earning.totalRedeemed += amount;
    }
    earning.status = status;
    await earning.save();
    res.status(200).json({ message: 'Status updated successfully', earning });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};