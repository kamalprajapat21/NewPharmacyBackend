import UserBookings from '../models/UserBookingMd.js';

export const getUrgentBookings = async (req, res) => {
  try {
    const bookings = await UserBookings.find();
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getBookingById = async (req, res) => {
  try {
    const userBookings = await UserBookings.findOne({ 'bookings._id': req.params.id });

    if (!userBookings) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    const booking = userBookings.bookings.id(req.params.id);
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Booking not found' });
    }
    res.status(500).send('Server Error');
  }
};

export const endService = async (req, res) => {
  try {
    const { id } = req.params;
    const userBookings = await UserBookings.findOne({ 'bookings._id': id });

    if (!userBookings) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = userBookings.bookings.id(id);
    if (booking.status !== 'Pending') {
      return res.status(400).json({ message: 'Booking is not in Pending status' });
    }

    booking.status = 'Completed';

    await userBookings.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
