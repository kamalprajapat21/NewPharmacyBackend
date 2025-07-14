import BookingforUrgent2 from '../models/UserBookingVd.js';

export const getUrgentBookings2 = async (req, res) => {
  try {
    const bookings = await BookingforUrgent2.find();
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getBookingById2 = async (req, res) => {
  try {
    const userBooking = await BookingforUrgent2.findOne({ 'bookings._id': req.params.id });

    if (!userBooking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    const booking = userBooking.bookings.id(req.params.id);
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Booking not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update booking status from Pending to Completed
export const endService2 = async (req, res) => {
  try {
    const { id } = req.params;
    const userBooking = await BookingforUrgent2.findOne({ 'bookings._id': id });

    if (!userBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = userBooking.bookings.id(id);
    if (booking.status !== 'Pending') {
      return res.status(400).json({ message: 'Booking is not in Pending status' });
    }

    booking.status = 'Completed';

    await userBooking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

