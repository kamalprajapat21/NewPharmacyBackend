import mongoose from 'mongoose';

const bookingSchema2 = new mongoose.Schema({
  bookingId: String,
  date: String,
  time: String,
  labTests: [String],
  patientName: String,
  address: String,
  charges: Number,
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Reject','Read', 'Incoming'],
    default: 'Incoming'
  }
});

const userBookingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookings: [bookingSchema2]
});

const UserBookingVd = mongoose.model('UserBookingVd', userBookingsSchema);

export default UserBookingVd;
