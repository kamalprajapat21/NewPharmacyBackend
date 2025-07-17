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
// import mongoose from 'mongoose';

// export default (conn) => {
//   const schema = new mongoose.Schema({
//     message: { type: String, required: true },
//     for: { type: String, enum: ['PWA', 'Pharmacy', 'DRA'], required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // patient id
//     serviceType: String,           // Medicine, Vaccination etc.
//   bookingId: { type: String, unique: true }, // Ensure bookingId is unique
//     pharmacyName: String,
//     pharmacyId: String,            // use _id as string
//     patientName: String,
//     status: { type: String, enum: [ 'incoming','pending'], default: 'incoming' },
//     patientMobile: { type: String, unique: true },
//     isRead: { type: Boolean, default: false },
//     createdAt: { type: Date, default: Date.now }
//   });

//   try {
//     return conn.model('Notification');
//   } catch {
//     return conn.model('Notification', schema);
//   }
// };


// import mongoose from 'mongoose';
// import cron from 'node-cron';

// export default (conn) => {
//   const schema = new mongoose.Schema({
//     message: { type: String, required: true },
//     for: { type: String, enum: ['PWA', 'Pharmacy', 'DRA'], required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }, // patient id
//     serviceType: String,           // Medicine, Vaccination etc.
//     bookingId: { type: String, unique: true }, // Ensure bookingId is unique
//     pharmacyName: String,
//     pharmacyId: String,            // use _id as string
//     patientName: String,
//     status: { type: String, enum: ['incoming', 'pending'], default: 'incoming' },
//     patientMobile: { type: String, unique: true },
//     isRead: { type: Boolean, default: false },
//     createdAt: { type: Date, default: Date.now }
//   });

//   try {
//     const Notification = conn.model('Notification');
    
//     // Schedule a job to run every 24 hours
//     cron.schedule('0 0 * * *', async () => {
//       const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//       await Notification.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });
//       console.log('Old notifications deleted');
//     });

//     return Notification;
//   } catch {
//     return conn.model('Notification', schema);
//   }
// };



import mongoose from 'mongoose';
import cron from 'node-cron';

export default (conn) => {
  const schema = new mongoose.Schema({
    message: { type: String, required: true },
    for: { type: String, enum: ['PWA', 'Pharmacy', 'DRA'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }, // patient id
    serviceType: String,
    bookingId: { type: String, unique: true },
    pharmacyName: String,
    pharmacyId: String, 
    patientName: String,
    status: { type: String, enum: ['incoming', 'pending'], default: 'incoming' },
    patientMobile: { type: String, unique: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });

  let Notification;
  try {
    Notification = conn.model('Notification');
  } catch {
    Notification = conn.model('Notification', schema);
  }

  // Schedule job to run every hour
  cron.schedule('0 * * * *', async () => {
    try {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const result = await Notification.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });
      console.log(`Deleted ${result.deletedCount} old notifications`);
    } catch (error) {
      console.error('Error deleting old notifications:', error);
    }
  });

  return Notification;
};
