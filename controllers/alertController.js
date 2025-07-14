import User from '../models/User.js';
import UserBookingMd from '../models/UserBookingMd.js';
import UserBookingVd from '../models/UserBookingVd.js';
import Alert from '../models/Alert.js';



export const getAlert = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const user = await User.findOne({ mobile: phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const medicineBookings = await UserBookingMd.findOne({ userId: user._id });

    const vaccinationBookings = await UserBookingVd.findOne({ userId: user._id });

    let alerts = [];

    if (medicineBookings) {
      const medicineAlerts = medicineBookings.bookings
        .filter(booking => booking.status === 'Incoming')
        .map(booking => ({
          patientName: booking.patientName,
          date: booking.date,
          time: booking.time,
          status: booking.status,
          type: 'Medicine',
          userId: user._id,
          visible: true
        }));

      for (const alert of medicineAlerts) {
        const existingAlert = await Alert.findOne({
          patientName: alert.patientName,
          date: alert.date,
          time: alert.time,
          type: 'Medicine',
          userId: user._id
        });

        if (!existingAlert) {
          const newAlert = await Alert.create(alert);
          alerts.push(newAlert);
        } else if (!existingAlert.visible) {
          continue;
        } else {
          alerts.push(existingAlert);
        }
      }
    }

    if (vaccinationBookings) {
      const vaccinationAlerts = vaccinationBookings.bookings
        .filter(booking => booking.status === 'incoming')
        .map(booking => ({
          patientName: booking.patientName,
          date: booking.date,
          time: booking.time,
          status: booking.status,
          type: 'Vaccination', 
          userId: user._id,
          visible: true
        }));

      for (const alert of vaccinationAlerts) {
        const existingAlert = await Alert.findOne({
          patientName: alert.patientName,
          date: alert.date,
          time: alert.time,
          type: 'Vaccination',
          userId: user._id
        });

        if (!existingAlert) {
          const newAlert = await Alert.create(alert);
          alerts.push(newAlert);
        } else if (!existingAlert.visible) {
          continue;
        } else {
          alerts.push(existingAlert);
        }
      }
    }

    res.status(200).json(alerts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const clearAllAlerts = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const user = await User.findOne({ mobile: phoneNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Alert.updateMany({ userId: user._id }, { visible: false });

    res.status(200).json({ message: 'All alerts cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

