import User from '../models/User.js';
import UserBookingVd from '../models/UserBookingVd.js';
import Earning from '../models/Earning.js';

export const createBookingUrgent2 = async (req, res) => {
  try {
    const { userId, bookingId, date, time, labTests, patientName, address, charges, status } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      console.log('Alert: User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const newBooking = {
      bookingId,
      date,
      time,
      labTests,
      patientName,
      address,
      charges,
      status
    };

    const userBookings = await UserBookingVd.findOne({ userId });

    if (userBookings) {
      userBookings.bookings.push(newBooking);
      await userBookings.save();
    } else {
      await UserBookingVd.create({
        userId,
        bookings: [newBooking]
      });
    }

    // Find the earning record for the user
    let earning = await Earning.findOne({ userId: userId });
    if (!earning) {
      earning = new Earning({ userId: userId });
    }

    // Add the charges to the available balance
    // earning.availableBalance += charges;
    await earning.save();

    res.status(201).json({
      message: 'Urgent booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    console.log('Alert: Server error', error.message);
    res.status(500).json({ error: 'Failed to create urgent booking' });
  }
};

export const createBookingStandalone2 = async (req, res) => {
  try {
    const { userId, bookingId,  time, labTests, patientName, address, charges, status } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      console.log('Alert: User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const newBooking = {
      bookingId,
      date,
      time,
      labTests,
      patientName,
      address,
      charges,
      status
    };

    const userBookings = await UserBookingVd.findOne({ userId });

    if (userBookings) {
      userBookings.bookings.push(newBooking);
      await userBookings.save();
    } else {
      await UserBookingVd.create({
        userId,
        bookings: [newBooking]
      });
    }

    // Find the earning record for the user
    let earning = await Earning.findOne({ userId: userId });
    if (!earning) {
      earning = new Earning({ userId: userId });
    }

    // Add the charges to the available balance
    earning.availableBalance += charges;
    await earning.save();

    res.status(201).json({
      message: 'Urgent booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    console.log('Alert: Server error', error.message);
    res.status(500).json({ error: 'Failed to create urgent booking' });
  }
};

export const getAllIncoming2 = async (req, res) => {
  const { phoneNumber } = req.body; // Destructure phoneNumber from req.body
  console.log(phoneNumber);
  try {
    // Use mobile instead of phoneNumber in the findOne query
    const user = await User.findOne({ mobile: phoneNumber });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const userBookings = await UserBookingVd.findOne({ userId: user._id }).populate('userId');

    if (!userBookings) {
      return res.status(404).send('No bookings found for this user');
    }
    const incomingBookings = userBookings.bookings.filter(booking => booking.status === 'Incoming');

    res.json(incomingBookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const acceptBooking2 = async (req, res) => {
  try {
    const { id } = req.params;
    const userBookings = await UserBookingVd.findOne({ 'bookings._id': id });

    if (!userBookings) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = userBookings.bookings.id(id);
    booking.status = 'Pending';

    await userBookings.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const rejectBooking2 = async (req, res) => {
  try {
    const { id } = req.params;
    const userBookings = await UserBookingVd.findOne({ 'bookings._id': id });

    if (!userBookings) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = userBookings.bookings.id(id);
    booking.status = 'Reject';

    await userBookings.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllPending2 = async (req, res) => {
  const { phoneNumber } = req.body; // Destructure phoneNumber from req.body
  console.log(phoneNumber);
  try {
    // Use mobile instead of phoneNumber in the findOne query
    const user = await User.findOne({ mobile: phoneNumber });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const userBookings = await UserBookingVd.findOne({ userId: user._id }).populate('userId');

    if (!userBookings) {
      return res.status(404).send('No bookings found for this user');
    }

    const urgentBookings = userBookings.bookings.filter(booking => ['Pending'].includes(booking.status));

    res.json(urgentBookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllCompleted2 = async (req, res) => {
  const { phoneNumber } = req.body; // Destructure phoneNumber from req.body
  console.log(phoneNumber);
  try {
    // Use mobile instead of phoneNumber in the findOne query
    const user = await User.findOne({ mobile: phoneNumber });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const userBookings = await UserBookingVd.findOne({ userId: user._id }).populate('userId');

    if (!userBookings) {
      return res.status(404).send('No bookings found for this user');
    }

    const urgentBookings = userBookings.bookings.filter(booking => ['Completed'].includes(booking.status));

    res.json(urgentBookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const completeBooking2 = async (req, res) => {
  try {
    const { id } = req.params;
    const userBookings = await UserBookingVd.findOne({ 'bookings._id': id });

    if (!userBookings) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = userBookings.bookings.id(id);
    booking.status = 'Completed';

    await userBookings.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
