// backend/models/Document.js
import mongoose from 'mongoose';

const dosageSchema = new mongoose.Schema({
  dosage: String,
  labId:String
}, { timestamps: true });

// const Dosage = mongoose.model('Dosage', dosageSchema);
export default (conn) => conn.model('Dosage2', dosageSchema);


