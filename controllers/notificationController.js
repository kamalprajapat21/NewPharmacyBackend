import mongoose from 'mongoose';
import notificationModel from '../models/NoificationModel/Notification.js';
import User1Model from '../models/User1.js'; 
import { getIo } from '../config/socket.js'; 



// helper: get pharmacy name
async function getPharmacyName(conn1, pharmacyId) {
  const PharmacyUser1 = User1Model(conn1);
  if (!mongoose.Types.ObjectId.isValid(pharmacyId)) {
    throw new Error('Invalid pharmacyId');
  }
  const pharmacy = await PharmacyUser1.findById(pharmacyId);
  if (!pharmacy) throw new Error('Pharmacy not found');
  return pharmacy.fullName;
}

// helper: get booking & validate userId
async function getBookingAndValidateUser({ conn2, bookingId, serviceType, userId }) {
  let bookingDoc;
  const collectionName = serviceType === 'Medicine' ? 'medicine23' : 'vaccination10';
  bookingDoc = await conn2.collection(collectionName).findOne({
    'bookings.bookingId': bookingId,
    userId: new mongoose.Types.ObjectId(userId)
  });
  if (!bookingDoc) throw new Error('BookingId not found or does not belong to userId');
  return { patientName: bookingDoc.bookings?.[0]?.patientName || 'Patient' };
}

// ================================
// Medicine: Pharmacy ➜ PWA
// ================================
export const createMedicineNotificationToPWA = async (req, res) => {
  try {
    const { bookingId, pharmacyId } = req.body;
    const conn1 = req.conn1;
    const conn2 = req.conn2;

    // Find the booking in the medicine collection
    const MedicineModel = (await import('../models/MedicineModel.js')).default(conn2);
    const bookingDoc = await MedicineModel.findOne({ 'bookings.bookingId': bookingId });

    if (!bookingDoc) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Find the specific booking in the bookings array
    const booking = bookingDoc.bookings.find(b => b.bookingId === bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found in document' });
    }

    // Validate pharmacyId
    if (pharmacyId && booking.pharmacyId && pharmacyId !== String(booking.pharmacyId)) {
      return res.status(403).json({ success: false, message: 'Pharmacy does not match booking' });
    }

    const userId = booking.userId;
    const patientName = booking.patientName;

    // Get pharmacy name if needed
    let pharmacyName = '';
    if (booking.pharmacyId) {
      const PharmacyUser1 = User1Model(conn1);
      const pharmacy = await PharmacyUser1.findById(booking.pharmacyId);
      pharmacyName = pharmacy ? pharmacy.fullName : '';
    }

    const message = `${pharmacyName} accepted your Medicine booking`;

    const Notification = notificationModel(conn2);
    const notification = new Notification({
      message,
      for: 'PWA',
      userId,
      serviceType: 'Medicine',
      bookingId,
      pharmacyId: booking.pharmacyId,
      pharmacyName,
      patientName
    });
    await notification.save();

    // Emit real-time notification
    const io = getIo();
    if (io && userId) {
      io.to(userId.toString()).emit('pharmacyBookingAccepted', {
        message, bookingId, pharmacyId: booking.pharmacyId, pharmacyName, serviceType: 'Medicine'
      });
    }

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

    const { patientName } = await getBookingAndValidateUser({ conn2, bookingId, serviceType, userId });
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


export const getIncomingNotificationsForPharmacy = async (req, res) => {
  try {
    const conn2 = req.conn2; // PWA DB
    const Notification = notificationModel(conn2);

    // find notifications intended for Pharmacy where status=Incoming
    const notifications = await Notification.find({
      for: 'Pharmacy'
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('❌ Error fetching incoming notifications for pharmacy:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch notifications' });
  }
};




export const updateBookingStatusAndRemoveNotification = async (req, res) => {
  try {
    const { notificationId } = req.body;
    const conn2 = req.conn2; 
    const Notification = notificationModel(conn2);

    const deleted = await Notification.findByIdAndDelete(notificationId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Notification removed successfully'
    });
  } catch (error) {
    console.error('❌ Error removing notification:', error);
    res.status(500).json({ success: false, message: error.message || 'Internal server error' });
  }
};



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




/*
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

// export const getIncomingNotificationsForPharmacy = async (req, res) => {
//   try {
//     const conn2 = req.conn2; // PWA DB
//     const Notification = notificationModel(conn2);

//     // Find notifications intended for Pharmacy
//     const notifications = await Notification.find({
//       for: 'Pharmacy'
//     }).sort({ createdAt: -1 });

//     // Group notifications by bookingId, retrieving only the latest notification per booking
//     const uniqueNotifications = {};
//     notifications.forEach(notification => {
//       const key = notification.bookingId; // Assuming bookingId is a unique identifier
//       if (!uniqueNotifications[key]) {
//         uniqueNotifications[key] = notification;
//       }
//     });

//     res.status(200).json({ success: true, notifications: Object.values(uniqueNotifications) });
//   } catch (error) {
//     console.error('❌ Error fetching incoming notifications for pharmacy:', error);
//     res.status(500).json({ success: false, message: error.message || 'Failed to fetch notifications' });
//   }
// };
export const getIncomingNotificationsForPharmacy = async (req, res) => {
  try {
    const conn2 = req.conn2; // PWA DB
    const Notification = notificationModel(conn2);
    // Find notifications intended for Pharmacy with status "incoming"
    const notifications = await Notification.find({
      for: 'Pharmacy',
      status: 'incoming' // Filter by status
    }).sort({ createdAt: -1 });
    // Group notifications by bookingId and patientMobile, retrieving only the latest notification per group
    const uniqueNotifications = {};
    notifications.forEach(notification => {
      const key = `${notification.bookingId}-${notification.patientMobile}`; // Create a unique key based on bookingId and patientMobile
      if (!uniqueNotifications[key]) {
        uniqueNotifications[key] = notification;
      }
    });
    res.status(200).json({ success: true, notifications: Object.values(uniqueNotifications) });
  } catch (error) {
    console.error('❌ Error fetching incoming notifications for pharmacy:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to fetch notifications' });
  }
};
// export const getIncomingNotificationsForPharmacy = async (req, res) => {
//   try {
//     const conn2 = req.conn2; // PWA DB
//     const Notification = notificationModel(conn2);

//     // Find notifications intended for Pharmacy
//     const notifications = await Notification.find({
//       for: 'Pharmacy'
//     }).sort({ createdAt: -1 });

//     // Group notifications by bookingId, retrieving only the latest notification per booking
//     const uniqueNotifications = {};
//     notifications.forEach(notification => {
//       const key = notification.bookingId; // Assuming bookingId is a unique identifier
//       if (!uniqueNotifications[key]) {
//         uniqueNotifications[key] = notification;
//       }
//     });

//     // Build simplified message list
//     const simplifiedNotifications = Object.values(uniqueNotifications).map(notification => {
//       const name = notification.userName || 'Name'; // replace 'Name' with actual field if available
//       const serviceType = notification.serviceType || '';
//       const date = new Date(notification.createdAt).toLocaleString('en-GB', {
//         day: '2-digit', month: 'long', year: 'numeric',
//         hour: '2-digit', minute: '2-digit', hour12: false
//       });
//       return `New ${serviceType} booking request from ${name}\nService Type: ${serviceType}\n${date}`;
//     });

//     res.status(200).json({ success: true, notifications: simplifiedNotifications });
//   } catch (error) {
//     console.error('❌ Error fetching incoming notifications for pharmacy:', error);
//     res.status(500).json({ success: false, message: error.message || 'Failed to fetch notifications' });
//   }
// };



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
            { $set: { "bookings.$.status": "incoming" } }
          );
        } else if (notification.serviceType === 'Vaccination') {
          const VaccineModel = createVaccine(conn2);
          await VaccineModel.updateOne(
            { "bookings.bookingId": notification.bookingId },
            { $set: { "bookings.$.status": "incoming" } }
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

*/

export const deleteNotification = async (req, res) => {
  try {
    const conn2 = req.conn2; // PWA DB
    const Notification = notificationModel(conn2);
    const { notificationId } = req.body;

    await Notification.deleteOne({ _id: notificationId });

    res.status(200).json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    console.error('❌ Error deleting notification:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to delete notification' });
  }
};