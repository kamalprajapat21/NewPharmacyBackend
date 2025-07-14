// // backend/models/User1.js
// import mongoose, { Schema } from 'mongoose';

// const user1Schema = new mongoose.Schema({
//   mobile: { type: String, required: true, unique: true },
//   fullName: String,
//   pharmacyName: String,
//   pharmacyAddress1: String,
//   pharmacyAddress2: String,
//   city: String,
//   state: String,
//   pharmacyPhoto: String,
  
//   aadharCard: String,
//   panCard: String,
//   pharmacyLicense: String,
//   pharmacyEstablishedLicense: String,
//   nablLicense: String,
//   gstCertificate: String,
//   bankName: String,
//   accountNumber: String,
//   ifscCode: String,
//   uploadbankstatement: String,
//   signupStep: { type: Number, default: 0 },
//   signupCompleted: { type: Boolean, default: false },
//   createdOn: { type: Date, default: Date.now },
//   modifiedOn: { type: Date, default: Date.now }
// });

// export default mongoose.model('User1', user1Schema);



// backend/models/User1.js
import mongoose from 'mongoose';

const user1Schema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  fullName: String,
  pharmacyName: String,
  pharmacyAddress1: String,
  pharmacyAddress2: String,
  city: String,
  state: String,
  pharmacyPhoto: String,
  aadharCard: String,
  panCard: String,
  pharmacyLicense: String,
  pharmacyEstablishedLicense: String,
  nablLicense: String,
  gstCertificate: String,
  bankName: String,
  accountNumber: String,
  ifscCode: String,
  uploadbankstatement: String,
  signupStep: { type: Number, default: 0 },
  signupCompleted: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now }
});

// export default mongoose.model('User1', user1Schema);
export default (conn) => conn.model('User1', user1Schema);
