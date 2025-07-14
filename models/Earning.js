// import mongoose from 'mongoose';

// const earningSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   totalCompletedBookings: { type: Number, default: 0, min: [0, 'Total Completed Bookings cannot be negative'] },
//   totalEarnings: { type: Number, default: 0, min: [0, 'Total Earnings cannot be negative'] },
//   totalRedeemed: { type: Number, default: 0, min: [0, 'Total Redeemed cannot be negative'] },
//   availableBalance: { type: Number, default: 0, min: [0, 'Available Balance cannot be negative'] },
//   withdrawRequest: { type: Number, default: 0, min: [0, 'Withdraw Request cannot be negative'] },
//   status: { type: String, enum: ['yes', 'no'], default: 'yes' }
// });

// const Earning = mongoose.model('Earning', earningSchema);

// export default Earning;


import mongoose from 'mongoose';

const earningSchema = new mongoose.Schema({
  labownermobile:String,
  totalCompletedBookings: { type: Number, default: 0, min: [0, 'Total Completed Bookings cannot be negative'] },
  totalEarnings: { type: Number, default: 0, min: [0, 'Total Earnings cannot be negative'] },
  totalRedeemed: { type: Number, default: 0, min: [0, 'Total Redeemed cannot be negative'] },
  availableBalance: { type: Number, default: 0, min: [0, 'Available Balance cannot be negative'] },
  withdrawRequest: { type: Number, default: 0, min: [0, 'Withdraw Request cannot be negative'] },
  status: { type: String, enum: ['yes', 'no'], default: 'yes' }
});


export default (conn) => conn.model('Earningmedicine', earningSchema);
