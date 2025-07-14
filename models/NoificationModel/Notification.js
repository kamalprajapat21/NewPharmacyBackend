// import mongoose from 'mongoose';

// export default (conn = mongoose) => {
//   const schema = new mongoose.Schema({
//     message: { type: String, required: true },
//     for: { type: String, enum: ['DRA', 'PWA','Pharmacy'], required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     serviceType: String,
//     bookingId: String,
//     draName: String,
//     draId: String,
// //Pharmacy
//   pharmacyName: String,    // ✅ new
//   pharmacyId: String,     // ✅ new
// //Pharmacy

//     // patientName: String,
//     patientMobile: String,
//     isRead: { type: Boolean, default: false },
//     createdAt: { type: Date, default: Date.now }
//   });

//   return conn.models?.Notification || conn.model('Notification', schema);
// };



////KamalCode
// models/Notification.js
import mongoose from 'mongoose';

export default (conn) => {
  const schema = new mongoose.Schema({
    message: { type: String, required: true },
    for: { type: String, enum: ['PWA', 'Pharmacy', 'DRA'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // patient id
    serviceType: String,           // Medicine, Vaccination etc.
    bookingId: String,
    pharmacyName: String,
    pharmacyId: String,            // use _id as string
    patientName: String,
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });

  try {
    return conn.model('Notification');
  } catch {
    return conn.model('Notification', schema);
  }
};
