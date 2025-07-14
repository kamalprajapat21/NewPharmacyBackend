import Earningsd from '../models/Earning2.js';
import User from '../models/User.js';

export const getAvailable = async (req, res) => {
  const { phoneNumber } = req.body; 

  try {
    const user = await User.findOne({ mobile: phoneNumber });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const earning = await Earningsd.findOne({ userId: user._id });
    if (!earning) {
      return res.status(404).send('Earnings not found for user');
    }

    if (!earning.availableBalance) {
      earning.availableBalance = earning.totalEarnings;
      await earning.save();
    }

    
    const { availableBalance, totalRedeemed } = earning;
    res.json({
      availableBalance,
      totalRedeemed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
