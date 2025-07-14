// import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();

// import mongoose from 'mongoose';
// import connectDB from './config/db.js'; // Assuming this now returns multiple connections
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import multer from 'multer';
// import path from 'path';

// import authRoutes from './routes/authRoutes.js';
// import otpRoutes from './routes/otpRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import timerRoutes from './routes/timerRoutes.js';
// import bookingRoutes from './routes/bookingRoutes.js';
// import bookingRoutes2 from './routes/bookingRoutes2.js';
// import alertRoutes from './routes/alertRoutes.js';
// import bookingserviceRoutes from './routes/bookingserviceRoutes.js';
// import bookingserviceRoutes2 from './routes/bookingserviceRoutes2.js';
// import withdrawRoutes2 from './routes/withdrawRoutes2.js';
// import bankInfoRoutes from './routes/bankInfoRoutes.js';
// import documentRoutes from './routes/documents.js';
// import editprofileRoutes from './routes/editprofileRoutes.js';
// import logoutRoutes from './routes/logoutRoutes.js';
// import withdrawRoutes from './routes/withdrawRoutes.js';
// import earningRoutes from './routes/earningRoutes.js';
// import earningRoutes2 from './routes/earningRoutes2.js';
// import dosageRoutes from './routes/dosageRoutes.js';
// import userBookingsRoutes from './routes/userBookingsRoutessd.js';
// import standaloneRoutes from './routes/StandaloneServiceRoutes.js'
// import viewprofileRoutes from './routes/viewprofileRoutes.js'

// import withdrawvaccineRoutes from './routes/withdrawvaccineRoutes.js';
// import earningvaccineRoutes from './routes/earningvaccineRoutes.js';

// //KamalCode Notification Start
// import notificationRoutes from './routes/notificationRoutes.js'; // Adjust path if needed
// //KamalCode Notification End



// ////SecretKey Add (KamalCode)

// ////SecretKey Add (KamalCode)



// const app = express();



// ///KAmalCode

// ///KAmalCode

// app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());
// app.use(cors({origin: '*'}));

// // aws setup
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const buildPath = path.join(__dirname, '../frontend/dist');
// app.use(express.static(buildPath));

// // Connect to database
// connectDB().then(({ conn1, conn2 }) => {
//   // Global middleware to attach both connections to every request
//   app.use((req, res, next) => {
//     req.conn1 = conn1; // First DB connection
//     req.conn2 = conn2; // Second DB connection
//     next();
//   });

//   // Define routes without individual middlewares
// // Routes using conn1
// // Routes using conn1
// app.use('/api/auth', authRoutes);
// app.use('/api/otp', otpRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/timer', timerRoutes);
// app.use('/api/booking', bookingRoutes);
// app.use('/api/booking2', bookingRoutes2);
// app.use('/api/earningmedicine', earningRoutes);
// app.use('/api/withdrawmedicine', withdrawRoutes);
// app.use('/api/earningvaccine', earningvaccineRoutes);
// app.use('/api/withdrawvaccine', withdrawvaccineRoutes);
// app.use('/api/bankinfo', bankInfoRoutes);
// app.use('/api/documents', documentRoutes);
// app.use('/api/profile', editprofileRoutes);
// app.use('/api/logout', logoutRoutes);
// app.use('/api/dosage', dosageRoutes);

// // Routes using conn2
// app.use('/api/alerts', alertRoutes);

// //Notification KamalCode start
// app.use('/api/notifications', notificationRoutes);


// //Notification KamalCode end



// app.use('/api/bookingservice', bookingserviceRoutes);
// app.use('/api/bookingservice2', bookingserviceRoutes2);
// app.use('/api/earning2', earningRoutes2);
// app.use('/api/withdraw2', withdrawRoutes2);
// app.use('/api/sd', standaloneRoutes);
// app.use('/api/viewprofile', viewprofileRoutes);

//   // Default route
//   app.get('/', (req, res) => {
//     res.json({ message: "hello world" });
//   });

//   // Serve frontend
//   app.get('*', (req, res) => { 
//     res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html')); 
//   });

//   // Start server
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// }).catch(error => {
//   console.error(`Error: ${error.message}`);
// });




import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from './config/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import userRoutes from './routes/userRoutes.js';
import timerRoutes from './routes/timerRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import bookingRoutes2 from './routes/bookingRoutes2.js';
import alertRoutes from './routes/alertRoutes.js';
import bookingserviceRoutes from './routes/bookingserviceRoutes.js';
import bookingserviceRoutes2 from './routes/bookingserviceRoutes2.js';
import withdrawRoutes2 from './routes/withdrawRoutes2.js';
import bankInfoRoutes from './routes/bankInfoRoutes.js';
import documentRoutes from './routes/documents.js';
import editprofileRoutes from './routes/editprofileRoutes.js';
import logoutRoutes from './routes/logoutRoutes.js';
import withdrawRoutes from './routes/withdrawRoutes.js';
import earningRoutes from './routes/earningRoutes.js';
import earningRoutes2 from './routes/earningRoutes2.js';
import dosageRoutes from './routes/dosageRoutes.js';
import userBookingsRoutes from './routes/userBookingsRoutessd.js';
import standaloneRoutes from './routes/StandaloneServiceRoutes.js';
import viewprofileRoutes from './routes/viewprofileRoutes.js';
import withdrawvaccineRoutes from './routes/withdrawvaccineRoutes.js';
import earningvaccineRoutes from './routes/earningvaccineRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import createUser from './models/User.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// aws setup
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const buildPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(buildPath));

// ✅ Connect to database
connectDB().then(({ conn1, conn2 }) => {
  app.use((req, res, next) => {
    req.conn1 = conn1;
    req.conn2 = conn2;
    next();
  });

  // ✅ All routes
  app.use('/api/auth', authRoutes);
  app.use('/api/otp', otpRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/timer', timerRoutes);
  app.use('/api/booking', bookingRoutes); ////UrgentBookings
  app.use('/api/booking2', bookingRoutes2);
  app.use('/api/earningmedicine', earningRoutes);
  app.use('/api/withdrawmedicine', withdrawRoutes);
  app.use('/api/earningvaccine', earningvaccineRoutes);
  app.use('/api/withdrawvaccine', withdrawvaccineRoutes);
  app.use('/api/bankinfo', bankInfoRoutes);
  app.use('/api/documents', documentRoutes);
  app.use('/api/profile', editprofileRoutes);
  app.use('/api/logout', logoutRoutes);
  app.use('/api/dosage', dosageRoutes);
  app.use('/api/alerts', alertRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/bookingservice', bookingserviceRoutes);
  app.use('/api/bookingservice2', bookingserviceRoutes2);
  app.use('/api/earning2', earningRoutes2);
  app.use('/api/withdraw2', withdrawRoutes2);
  app.use('/api/sd', standaloneRoutes);
  app.use('/api/viewprofile', viewprofileRoutes);

  // ✅ Default & frontend
  app.get('/', (req, res) => {
    res.json({ message: "hello world" });
  });
  
  // Test endpoint to check database connection
  app.get('/api/test-db', (req, res) => {
    try {
      const User = createUser(req.conn1);
      res.json({ 
        message: "Database connection test", 
        conn1Status: req.conn1.readyState === 1 ? 'connected' : 'disconnected',
        conn2Status: req.conn2.readyState === 1 ? 'connected' : 'disconnected'
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(error => {
  console.error(`Error: ${error.message}`);
});
