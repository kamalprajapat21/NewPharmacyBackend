// // import express from 'express';
// // import { createNotification, getNotifications } from '../controllers/notificationController.js';

// // const router = express.Router();

// // router.post('/', createNotification);  // from PWA ➝ DRA
// // router.get('/', getNotifications);     // patient fetches own notifications

// // export default router;




// import express from 'express';
// import {

//     getIncomingNotificationsForPharmacy,
//   createMedicineNotificationToPWA,
//   createVaccinationNotificationToPWA,
//   updateBookingStatusAndRemoveNotification,
//   createNotificationToPharmacy,
  
  
// } from '../controllers/notificationController.js'; // adjust path if needed

// const router = express.Router();


// // POST /api/notifications/medicine-to-pwa
// router.post('/medicine-to-pwa', createMedicineNotificationToPWA);

// // POST /api/notifications/vaccination-to-pwa
// router.post('/vaccination-to-pwa', createVaccinationNotificationToPWA);

// // POST /api/notifications/pwa-to-pharmacy
// router.post('/pwa-to-pharmacy', createNotificationToPharmacy);

// router.get('/pharmacy/incoming', getIncomingNotificationsForPharmacy);

// router.put('/update-status', updateBookingStatusAndRemoveNotification);



// export default router;






// // KamalCode
// import express from 'express';
// import {
//     getIncomingNotificationsForPharmacy,
//     createMedicineNotificationToPWA,
//     createVaccinationNotificationToPWA,
//     updateBookingStatusAndRemoveNotification,
//     createNotificationToPharmacy,
// } from '../controllers/notificationController.js'; // adjust path if needed

// const router = express.Router();

// // POST /api/notifications/medicine-to-pwa
// router.post('/medicine-to-pwa', createMedicineNotificationToPWA);

// // POST /api/notifications/vaccination-to-pwa
// router.post('/vaccination-to-pwa', createVaccinationNotificationToPWA);

// // POST /api/notifications/pwa-to-pharmacy
// router.post('/pwa-to-pharmacy', createNotificationToPharmacy);

// // GET incoming notifications for pharmacy
// router.get('/pharmacy/incoming', getIncomingNotificationsForPharmacy);

// // PUT to update status and remove notification
// router.put('/update-status', updateBookingStatusAndRemoveNotification);

// export default router;


import express from 'express';
import {
    getIncomingNotificationsForPharmacy,
    createMedicineNotificationToPWA,
    createVaccinationNotificationToPWA,
    updateBookingStatusAndRemoveNotification,
    createNotificationToPharmacy,
    deleteNotification,
} from '../controllers/notificationController.js'; // adjust path if needed

const router = express.Router();

// POST /api/notifications/medicine-to-pwa
router.post('/medicine-to-pwa', createMedicineNotificationToPWA);

// POST /api/notifications/vaccination-to-pwa
router.post('/vaccination-to-pwa', createVaccinationNotificationToPWA);

// POST /api/notifications/pwa-to-pharmacy
router.post('/pwa-to-pharmacy', createNotificationToPharmacy);

// GET incoming notifications for pharmacy
router.get('/pharmacy/incoming', getIncomingNotificationsForPharmacy);

// PUT to update status and remove notification
router.put('/update-status', updateBookingStatusAndRemoveNotification);

router.delete('/pharmacy', deleteNotification);

export default router;
