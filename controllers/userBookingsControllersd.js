import UserBookingMd from '../models/UserBookingMd.js';

export const createBooking = async (req, res) => {
  const { userId, booking } = req.body;
  
  try {
    const userBookings = await UserBookingMd.findOne({ userId });
    if (userBookings) {
      userBookings.bookings.push(booking);
      await userBookings.save();
    } else {
      await UserBookingMd.create({ userId, bookings: [booking] });
    }
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingsByUserId = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const userBookings = await UserBookingMd.findOne({ userId });
    if (userBookings) {
      res.status(200).json(userBookings.bookings);
    } else {
      res.status(404).json({ message: 'No bookings found for this user' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  const { userId, bookingId, status } = req.body;
  
  try {
    const userBookings = await UserBookingMd.findOne({ userId });
    if (userBookings) {
      const booking = userBookings.bookings.id(bookingId);
      if (booking) {
        booking.status = status;
        await userBookings.save();
        res.status(200).json({ message: 'Booking status updated successfully' });
      } else {
        res.status(404).json({ message: 'Booking not found' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  const { userId, bookingId } = req.params;
  
  try {
    const userBookings = await UserBookingMd.findOne({ userId });
    if (userBookings) {
      userBookings.bookings.id(bookingId).remove();
      await userBookings.save();
      res.status(200).json({ message: 'Booking deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
