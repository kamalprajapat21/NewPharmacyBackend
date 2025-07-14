// // import mongoose from 'mongoose';
// // import notificationModel from '../models/NoificationModel/Notification.js';
// // import User1Model from '../models/User1.js'; 
// // import { getIo } from '../config/socket.js'; 



// // // helper: get pharmacy name
// // async function getPharmacyName(conn1, pharmacyId) {
// //   const PharmacyUser1 = User1Model(conn1);
// //   if (!mongoose.Types.ObjectId.isValid(pharmacyId)) {
// //     throw new Error('Invalid pharmacyId');
// //   }
// //   const pharmacy = await PharmacyUser1.findById(pharmacyId);
// //   if (!pharmacy) throw new Error('Pharmacy not found');
// //   return pharmacy.fullName;
// // }

// // // helper: get booking & validate userId
// // async function getBookingAndValidateUser({ conn2, bookingId, serviceType, userId }) {
// //   let bookingDoc;
// //   const collectionName = serviceType === 'Medicine' ? 'medicine23' : 'vaccination10';
// //   bookingDoc = await conn2.collection(collectionName).findOne({
// //     'bookings.bookingId': bookingId,
// //     userId: new mongoose.Types.ObjectId(userId)
// //   });
// //   if (!bookingDoc) throw new Error('BookingId not found or does not belong to userId');
// //   return { patientName: bookingDoc.bookings?.[0]?.patientName || 'Patient' };
// // }

// // // ================================
// // // Medicine: Pharmacy ➜ PWA
// // // ================================
// // export const createMedicineNotificationToPWA = async (req, res) => {
// //   try {
// //     const { bookingId, pharmacyId, userId } = req.body;
// //     const conn1 = req.conn1;
// //     const conn2 = req.conn2;

// //     const Notification = notificationModel(conn2);
// //     const io = getIo();

// //     const serviceType = 'Medicine';

// //     // validate bookingId and userId belong together
// //     const { patientName } = await getBookingAndValidateUser({ conn2, bookingId, serviceType, userId });
// //     const pharmacyName = await getPharmacyName(conn1, pharmacyId);
// //     console.log({ patientName, pharmacyName });

// //     const message = `${pharmacyName} accepted your ${serviceType} booking`;

// //     const notification = new Notification({
// //       message,
// //       for: 'PWA',
// //       userId,
// //       serviceType,
// //       bookingId,
// //       pharmacyId,
// //       pharmacyName,
// //       patientName
// //     });
// //     await notification.save();

// //     io.to(userId.toString()).emit('pharmacyBookingAccepted', {
// //       message, bookingId, pharmacyId, pharmacyName, serviceType
// //     });

// //     res.status(201).json({ success: true, notification });
// //   } catch (error) {
// //     console.error('❌ Error creating PWA Medicine notification:', error);
// //     res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
// //   }
// // };

// // // ================================
// // // Vaccination: Pharmacy ➜ PWA
// // // ================================
// // export const createVaccinationNotificationToPWA = async (req, res) => {
// //   try {
// //     const { bookingId, pharmacyId, userId } = req.body;
// //     const conn1 = req.conn1;
// //     const conn2 = req.conn2;

// //     const Notification = notificationModel(conn2);
// //     const io = getIo();

// //     const serviceType = 'Vaccination';

// //     const { patientName } = await getBookingAndValidateUser({ conn2, bookingId, serviceType, userId });
// //     const pharmacyName = await getPharmacyName(conn1, pharmacyId);

// //     const message = `${pharmacyName} accepted your ${serviceType} booking`;

// //     const notification = new Notification({
// //       message,
// //       for: 'PWA',
// //       userId,
// //       serviceType,
// //       bookingId,
// //       pharmacyId,
// //       pharmacyName,
// //       patientName
// //     });
// //     await notification.save();

// //     io.to(userId.toString()).emit('pharmacyBookingAccepted', {
// //       message, bookingId, pharmacyId, pharmacyName, serviceType
// //     });

// //     res.status(201).json({ success: true, notification });
// //   } catch (error) {
// //     console.error('❌ Error creating PWA Vaccination notification:', error);
// //     res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
// //   }
// // };

// // // PWA ➜ Pharmacy: create notification
// // export const createNotificationToPharmacy = async (req, res) => {
// //   try {
// //     const { pharmacyId, message, serviceType, bookingId, patientName } = req.body;
// //     const conn2 = req.conn2; // Notification DB
// //     const Notification = notificationModel(conn2);
    
// //     // Optionally fetch pharmacy name
// //     let pharmacyName = '';
// //     if (pharmacyId) {
// //       try {
// //         const PharmacyUser1 = User1Model(req.conn1);
// //         const pharmacy = await PharmacyUser1.findById(pharmacyId);
// //         pharmacyName = pharmacy ? pharmacy.fullName : '';
// //       } catch {}
// //     }

// //     const notification = new Notification({
// //       message,
// //       for: 'Pharmacy',
// //       pharmacyId,
// //       pharmacyName,
// //       serviceType,
// //       bookingId,
// //       patientName,
// //       isRead: false,
// //       createdAt: new Date()
// //     });
// //     await notification.save();

// //     // Emit real-time notification to pharmacy
// //     try {
// //       const io = getIo();
// //       if (io && pharmacyId) {
// //         io.to(pharmacyId).emit('newPharmacyNotification', notification);
// //       }
// //     } catch (e) { console.error('Socket emit error:', e); }

// //     res.status(201).json({ success: true, notification });
// //   } catch (error) {
// //     console.error('❌ Error creating notification to pharmacy:', error);
// //     res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
// //   }
// // };


// // export const getIncomingNotificationsForPharmacy = async (req, res) => {
// //   try {
// //     const conn2 = req.conn2; // PWA DB
// //     const Notification = notificationModel(conn2);

// //     // find notifications intended for Pharmacy where status=Incoming
// //     const notifications = await Notification.find({
// //       for: 'Pharmacy'
// //     }).sort({ createdAt: -1 });

// //     res.status(200).json({ success: true, notifications });
// //   } catch (error) {
// //     console.error('❌ Error fetching incoming notifications for pharmacy:', error);
// //     res.status(500).json({ success: false, message: error.message || 'Failed to fetch notifications' });
// //   }
// // };




// // export const updateBookingStatusAndRemoveNotification = async (req, res) => {
// //   try {
// //     const { notificationId } = req.body;
// //     const conn2 = req.conn2; 
// //     const Notification = notificationModel(conn2);

// //     const deleted = await Notification.findByIdAndDelete(notificationId);

// //     if (!deleted) {
// //       return res.status(404).json({ success: false, message: 'Notification not found' });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: 'Notification removed successfully'
// //     });
// //   } catch (error) {
// //     console.error('❌ Error removing notification:', error);
// //     res.status(500).json({ success: false, message: error.message || 'Internal server error' });
// //   }
// // };



// import mongoose from 'mongoose';
// import notificationModel from '../models/NoificationModel/Notification.js';
// import User1Model from '../models/User1.js'; 
// import { getIo } from '../config/socket.js'; 

// // Helper: get pharmacy name
// async function getPharmacyName(conn1, pharmacyId) {
//   const PharmacyUser1 = User1Model(conn1);
//   if (!mongoose.Types.ObjectId.isValid(pharmacyId)) {
//     throw new Error('Invalid pharmacyId');
//   }
//   const pharmacy = await PharmacyUser1.findById(pharmacyId);
//   if (!pharmacy) throw new Error('Pharmacy not found');
//   return pharmacy.fullName;
// }

// // ================================
// // Medicine: Pharmacy ➜ PWA
// // ================================
// export const createMedicineNotificationToPWA = async (req, res) => {
//   try {
//     const { bookingId, pharmacyId, userId } = req.body;
//     const conn1 = req.conn1;
//     const conn2 = req.conn2;

//     const Notification = notificationModel(conn2);
//     const io = getIo();

//     const serviceType = 'Medicine';

//     // Validate bookingId and userId belong together
//     const { patientName } = await getBookingAndValidateUser ({ conn2, bookingId, serviceType, userId });
//     const pharmacyName = await getPharmacyName(conn1, pharmacyId);
//     const message = `${pharmacyName} accepted your ${serviceType} booking`;

//     const notification = new Notification({
//       message,
//       for: 'PWA',
//       userId,
//       serviceType,
//       bookingId,
//       pharmacyId,
//       pharmacyName,
//       patientName
//     });
//     await notification.save();

//     io.to(userId.toString()).emit('pharmacyBookingAccepted', {
//       message, bookingId, pharmacyId, pharmacyName, serviceType
//     });

//     res.status(201).json({ success: true, notification });
//   } catch (error) {
//     console.error('❌ Error creating PWA Medicine notification:', error);
//     res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
//   }
// };

// // ================================
// // Vaccination: Pharmacy ➜ PWA
// // ================================
// export const createVaccinationNotificationToPWA = async (req, res) => {
//   try {
//     const { bookingId, pharmacyId, userId } = req.body;
//     const conn1 = req.conn1;
//     const conn2 = req.conn2;

//     const Notification = notificationModel(conn2);
//     const io = getIo();

//     const serviceType = 'Vaccination';

//     const { patientName } = await getBookingAndValidateUser ({ conn2, bookingId, serviceType, userId });
//     const pharmacyName = await getPharmacyName(conn1, pharmacyId);

//     const message = `${pharmacyName} accepted your ${serviceType} booking`;

//     const notification = new Notification({
//       message,
//       for: 'PWA',
//       userId,
//       serviceType,
//       bookingId,
//       pharmacyId,
//       pharmacyName,
//       patientName
//     });
//     await notification.save();

//     io.to(userId.toString()).emit('pharmacyBookingAccepted', {
//       message, bookingId, pharmacyId, pharmacyName, serviceType
//     });

//     res.status(201).json({ success: true, notification });
//   } catch (error) {
//     console.error('❌ Error creating PWA Vaccination notification:', error);
//     res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
//   }
// };

// // PWA ➜ Pharmacy: create notification
// export const createNotificationToPharmacy = async (req, res) => {
//   try {
//     const { pharmacyId, message, serviceType, bookingId, patientName } = req.body;
//     const conn2 = req.conn2; // Notification DB
//     const Notification = notificationModel(conn2);
    
//     // Optionally fetch pharmacy name
//     let pharmacyName = '';
//     if (pharmacyId) {
//       try {
//         const PharmacyUser1 = User1Model(req.conn1);
//         const pharmacy = await PharmacyUser1.findById(pharmacyId);
//         pharmacyName = pharmacy ? pharmacy.fullName : '';
//       } catch {}
//     }

//     const notification = new Notification({
//       message,
//       for: 'Pharmacy',
//       pharmacyId,
//       pharmacyName,
//       serviceType,
//       bookingId,
//       patientName,
//       isRead: false,
//       createdAt: new Date()
//     });
//     await notification.save();

//     // Emit real-time notification to pharmacy
//     try {
//       const io = getIo();
//       if (io && pharmacyId) {
//         io.to(pharmacyId).emit('newPharmacyNotification', notification);
//       }
//     } catch (e) { console.error('Socket emit error:', e); }

//     res.status(201).json({ success: true, notification });
//   } catch (error) {
//     console.error('❌ Error creating notification to pharmacy:', error);
//     res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
//   }
// };

// // Get incoming notifications for pharmacy
// export const getIncomingNotificationsForPharmacy = async (req, res) => {
//   try {
//     const conn2 = req.conn2; // PWA DB
//     const Notification = notificationModel(conn2);

//     // Find notifications intended for Pharmacy
//     const notifications = await Notification.find({
//       for: 'Pharmacy'
//     }).sort({ createdAt: -1 });

//     res.status(200).json({ success: true, notifications });
//   } catch (error) {
//     console.error('❌ Error fetching incoming notifications for pharmacy:', error);
//     res.status(500).json({ success: false, message: error.message || 'Failed to fetch notifications' });
//   }
// };

// // Update booking status and remove notification
// export const updateBookingStatusAndRemoveNotification = async (req, res) => {
//   try {
//     const { notificationId } = req.body;
//     const conn2 = req.conn2; 
//     const Notification = notificationModel(conn2);

//     const deleted = await Notification.findByIdAndDelete(notificationId);

//     if (!deleted) {
//       return res.status(404).json({ success: false, message: 'Notification not found' });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Notification removed successfully'
//     });
//   } catch (error) {
//     console.error('❌ Error removing notification:', error);
//     res.status(500).json({ success: false, message: error.message || 'Internal server error' });
//   }
// };





import mongoose from 'mongoose';
import notificationModel from '../models/NoificationModel/Notification.js';
import User1Model from '../models/User1.js'; 
import { getIo } from '../config/socket.js'; 

// Helper: get pharmacy name
async function getPharmacyName(conn1, pharmacyId) {
  const PharmacyUser1 = User1Model(conn1);
  if (!mongoose.Types.ObjectId.isValid(pharmacyId)) {
    throw new Error('Invalid pharmacyId');
  }
  const pharmacy = await PharmacyUser1.findById(pharmacyId);
  if (!pharmacy) throw new Error('Pharmacy not found');
  return pharmacy.fullName;
}

// ================================
// Medicine: Pharmacy ➜ PWA
// ================================
export const createMedicineNotificationToPWA = async (req, res) => {
  try {
    const { bookingId, pharmacyId, userId } = req.body;
    const conn1 = req.conn1;
    const conn2 = req.conn2;

    const Notification = notificationModel(conn2);
    const io = getIo();

    const serviceType = 'Medicine';

    // Validate bookingId and userId belong together
    const { patientName } = await getBookingAndValidateUser ({ conn2, bookingId, serviceType, userId });
    const pharmacyName = await getPharmacyName(conn1, pharmacyId);
    const message = `${pharmacyName} accepted your ${serviceType} booking`;

    const notification = new Notification({
      message,
      for: 'PWA',
      userId,
      serviceType,
      bookingId,
      pharmacyId,
      pharmacyName,
      patientName
    });
    await notification.save();

    // Emit real-time notification to pharmacy
    io.to(userId.toString()).emit('pharmacyBookingAccepted', {
      message, bookingId, pharmacyId, pharmacyName, serviceType
    });

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error('❌ Error creating PWA Medicine notification:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
  }
};

// ================================
// Vaccination: Pharmacy ➜ PWA
// ================================
export const createVaccinationNotificationToPWA = async (req, res) => {
  try {
    const { bookingId, pharmacyId, userId } = req.body;
    const conn1 = req.conn1;
    const conn2 = req.conn2;

    const Notification = notificationModel(conn2);
    const io = getIo();

    const serviceType = 'Vaccination';

    const { patientName } = await getBookingAndValidateUser ({ conn2, bookingId, serviceType, userId });
    const pharmacyName = await getPharmacyName(conn1, pharmacyId);

    const message = `${pharmacyName} accepted your ${serviceType} booking`;

    const notification = new Notification({
      message,
      for: 'PWA',
      userId,
      serviceType,
      bookingId,
      pharmacyId,
      pharmacyName,
      patientName
    });
    await notification.save();

    io.to(userId.toString()).emit('pharmacyBookingAccepted', {
      message, bookingId, pharmacyId, pharmacyName, serviceType
    });

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error('❌ Error creating PWA Vaccination notification:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
  }
};

// PWA ➜ Pharmacy: create notification
export const createNotificationToPharmacy = async (req, res) => {
  try {
    const { pharmacyId, message, serviceType, bookingId, patientName } = req.body;
    const conn2 = req.conn2; // Notification DB
    const Notification = notificationModel(conn2);
    
    // Optionally fetch pharmacy name
    let pharmacyName = '';
    if (pharmacyId) {
      try {
        const PharmacyUser1 = User1Model(req.conn1);
        const pharmacy = await PharmacyUser1.findById(pharmacyId);
        pharmacyName = pharmacy ? pharmacy.fullName : '';
      } catch {}
    }

    const notification = new Notification({
      message,
      for: 'Pharmacy',
      pharmacyId,
      pharmacyName,
      serviceType,
      bookingId,
      patientName,
      isRead: false,
      createdAt: new Date()
    });
    await notification.save();

    // Emit real-time notification to pharmacy
    try {
      const io = getIo();
      if (io && pharmacyId) {
        io.to(pharmacyId).emit('newPharmacyNotification', notification);
      }
    } catch (e) { console.error('Socket emit error:', e); }

    res.status(201).json({ success: true, notification });
  } catch (error) {
    console.error('❌ Error creating notification to pharmacy:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
  }
};

// Get incoming notifications for pharmacy
export const getIncomingNotificationsForPharmacy = async (req, res) => {
  try {
    const conn2 = req.conn2; // PWA DB
    const Notification = notificationModel(conn2);

    // Find notifications intended for Pharmacy
    const notifications = await Notification.find({
      for: 'Pharmacy'
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('❌ Error fetching incoming notifications for pharmacy:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch notifications' });
  }
};

// Update booking status and remove notification
export const updateBookingStatusAndRemoveNotification = async (req, res) => {
  try {
    const { notificationId, newStatus } = req.body;
    const conn2 = req.conn2; 
    const Notification = notificationModel(conn2);

    console.log('Updating notification:', notificationId, 'to status:', newStatus);

    // First, get the notification to find the bookingId
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    console.log('Found notification:', notification);

    // Update the booking status in the appropriate collection
    if (notification.bookingId && notification.serviceType) {
      try {
        // Import the appropriate models
        const createMedicine = (await import('../models/MedicineModel.js')).default;
        const createVaccine = (await import('../models/vaccination.js')).default;
        
        if (notification.serviceType === 'Medicine') {
          const MedicineModel = createMedicine(conn2);
          await MedicineModel.updateOne(
            { "bookings.bookingId": notification.bookingId },
            { $set: { "bookings.$.status": "pending" } }
          );
        } else if (notification.serviceType === 'Vaccination') {
          const VaccineModel = createVaccine(conn2);
          await VaccineModel.updateOne(
            { "bookings.bookingId": notification.bookingId },
            { $set: { "bookings.$.status": "pending" } }
          );
        }
        
        console.log('Booking status updated successfully');
      } catch (bookingError) {
        console.error('Error updating booking status:', bookingError);
        // Continue with notification removal even if booking update fails
      }
    }

    // Emit an event to notify clients about the status change
    try {
      const io = getIo();
      if (io) {
        io.emit('bookingStatusChanged', { notificationId, newStatus });
      }
    } catch (socketError) {
      console.error('Socket emit error:', socketError);
    }

    // Remove the notification
    const deleted = await Notification.findByIdAndDelete(notificationId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    console.log('Notification removed successfully');

    res.status(200).json({
      success: true,
      message: 'Notification removed and booking status updated successfully'
    });
  } catch (error) {
    console.error('❌ Error updating notification and booking status:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
};
