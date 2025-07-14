// import mongoose from 'mongoose';

// const BookingSchema = new mongoose.Schema({
  
//   labacceptedBy: { type: String}, 
//   labacceptedByid: { type: String },
//   labownerId:String,
//   labownermobile:String,
//   labId: String,
//   bookingOtp: String,
//   labreportId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   mobile: { type: String, ref: 'User' },
//   Medicine: [String],
//   patientName: String,
//   patientAge: Number,
//   patientGender: String,
//   startDate: String,
//   prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
//   details: String,
//   timeslot: String,
//   dhaCharge:Number,
//   Rank: String,
//   status:String,
//   bookingId:String,
//   price: Number,
//   discount: Number,
//   discountedPrice: Number,
//   dosage: String,
// });

// BookingSchema.pre('save', function (next) {
//   if (this.isNew) {
//     const namePart = this.patientName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
//     const agePart = this.patientAge.toString().slice(0, 2);
//     const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
//     this.bookingId = namePart + agePart + randomPart;
//   }
//   next();
// });

// const LabSchema = new mongoose.Schema({
//   mobile:String,
//   bookings: [BookingSchema]
// });

// // export default mongoose.model('Medicine23', LabSchema);
// export default (conn) => conn.model('Medicine23', LabSchema);

import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  labacceptedBy: {type:String, default:"None"}, 
  labownerId: { type: String},
  labownermobile:String,
  labId: String,
  bookingOtp: {type:String},
  labreportId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
  prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mobileNumber: { type: String, ref: 'User' },
  Medicine: [String],
  patientName: String,
  patientAge: Number,
  patientGender: String,
  startDate: String,
  details: String,
  timeslot: String,
  dhaCharge:{type:Number},
  Rank: {type:String},
  status:{type:String},
  bookingId:String,
  price: {type:Number},
  discount: {type:Number},
  discountedPrice: {type:Number},
  dosage: {type:String},
});

const LabSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userId:String,
  mobile:String,
  bookings: [BookingSchema]
});

// export default mongoose.model('Medicine23', LabSchema);
export default (conn) => conn.model('Medicine23', LabSchema);

