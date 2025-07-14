import Timer from '../models/Timer.js';

export const fetchTime = async (req, res) => {
  try {
    const phoneNumber = "123123"; 

    const timer = await Timer.findOne({ phoneNumber });

    if (!timer) {
      return res.status(404).json({ message: 'Timer not found' });
    }

    const { hours, minutes, seconds } = timer;

    res.status(200).json({ hours, minutes, seconds });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {fetchTime};