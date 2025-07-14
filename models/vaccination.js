// import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

// // Define a sub-schema for the timer data
// const TimerSchema = new mongoose.Schema({
//   hours: { type: Number, default: 0 },
//   minutes: { type: Number, default: 0 },
//   seconds: { type: Number, default: 0 }
// });

// // Schema for individual bookings
// const BookingSchema = new mongoose.Schema({
//   labacceptedBy: {type:String}, 
//   labownerId: { type: String },
//   labId:{ type: String },
//   bookingOtp:{type:Number} ,
//   timerData: { type: TimerSchema, default: () => ({ hours: 0, minutes: 0, seconds: 0 }) },
//   labreportId: { type: String },
//   labownermobile:String,
//   Vaccine: [String], // List of vaccines
//   patientName: String,
//   patientAge: Number,
//   patientGender: String,
//   startDate: String,
//   prescription: [{ type: mongoose.Schema.Types.ObjectId, ref: 'uploads' }], // GridFS file IDs
//   timeslot: String,
//   dhaCharge: { type: Number, default: 300 },
//   Rank: {
//     type: String,
//     enum: ["Lab Assigned", "DHA Service Started", "DHA Assigned", "Pharmacy Assigned"],
//     default: "Lab Assigned"
//   },
//   status: {
//     type: String,
//   },
//   bookingId: { type: String, unique: true }
// });

// // Middleware to generate booking ID before saving a new booking
// BookingSchema.pre('save', function (next) {
//   if (this.isNew) {
//     const namePart = this.patientName.replace(/\s+/g, '').substring(0, 4).toUpperCase();
//     const agePart = this.patientAge.toString().slice(0, 2);
//     const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
//     this.bookingId = namePart + agePart + randomPart;
//   }
//   next();
// });

// // Schema for storing all bookings associated with a user
// const VaccinationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   bookings: [BookingSchema]
// });

// // Export the Vaccination model
// // export default mongoose.model('vaccination10', VaccinationSchema);
// export default (conn) => conn.model('vaccination10', VaccinationSchema);
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Schema for individual bookings
const BookingSchema = new mongoose.Schema({
  // labacceptedBy: {type:String}, 
  // labownerId: { type: String },
  labacceptedBy: {type:String, default:"None"}, 
  labownerId: { type: String, default: null },
  labownermobile:String,
  
  // labId:{ type: String },  
  labId: String,  //add by nav
  // bookingOtp:{type:Number} ,
  bookingOtp:{type:String} , //add by nav
  // timerData: { type: TimerSchema, default: () => ({ hours: 0, minutes: 0, seconds: 0 }) },
  // labreportId: { type: String },
  labreportId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs  //add by nav 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //add by nav
  mobileNumber: { type: String, ref: 'User' },  //add by nav
  Vaccine: [String], // List of vaccines
  patientName: String,
  patientAge: Number,
  patientGender: String,
  startDate: String,
  // prescription: [{ type: mongoose.Schema.Types.ObjectId, ref: 'uploads' }], // GridFS file IDs
  prescriptionId: [mongoose.Schema.Types.ObjectId], // Changed to store file IDs //add by nav
 
  details: String,   //add by nav 
  timeslot: String,
  dhaCharge: { type: Number, default: 300 },
  Rank: {type:String},
  status:{type:String},
  bookingId:String,
  price: {type:Number},
  discount: {type:Number},
  discountedPrice: {type:Number},
  dosage: {type:String},
});

// Schema for storing all bookings associated with a user
const VaccinationSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userId:String,
  bookings: [BookingSchema]
});

// Export the Vaccination model
// export default mongoose.model('vaccination10', VaccinationSchema);
export default (conn) => conn.model('vaccination10', VaccinationSchema);