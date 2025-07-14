// models/User1.js
import mongoose from 'mongoose';

const familyMemberSchema = new mongoose.Schema({
  name: String,
  relation: String,
  phone: String,
});

const user1Schema = new mongoose.Schema({
  mobileNumber: { type: String, required: true, unique: true },
  fullName: String,
  addressLine1: String,
  city: String,
  state: String,
  email: String,
  emergencyContactNumber: String,
  avatar: String,
  profilePhoto: String,
  signupStep: { type: Number, default: 0 },
  signupCompleted: { type: Boolean, default: false },
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
  physicalAssessmentPhoto: { type: String, required: false },
  gender: { type: String, required: false },
  height: { type: String, required: false },
  weight: { type: String, required: false },
  age: { type: String, required: false },
  bloodGroup: { type: String, required: false },
  disease: { type: String, required: false },
  disease: { type: String, required: false },
  familyMembers: [familyMemberSchema], 
  diseases: { type: [String], required: false }, 
  urgentCases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UrgentCase' }], 
  medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }],
  vaccinations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VaccinationService' }], 
  homeCareRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HomeCare' }],
  nursingCareRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NursingCare' }],
  labtests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lab'}]   
});

export default (conn) => conn.model('User1', user1Schema);