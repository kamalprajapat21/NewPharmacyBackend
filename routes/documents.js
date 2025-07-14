
// //practice code to reslove doc routes issue
// // routes/documentsRoutes.js
// import express from 'express';
// import createUser1 from '../models/User1.js';
// import multer from 'multer';
// import mongoose from 'mongoose';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import Grid from 'gridfs-stream';

// const router = express.Router();

// // Initialize MongoDB connection and GridFSBucket
// const conn = mongoose.connection;
// let gfs, gridFSBucket;

// conn.once('open', () => {
//   // Initialize GridFS stream and bucket
//   gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: 'uploads' // Make sure this matches the bucket name in GridFsStorage
//   });
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Set up storage engine
// const storage = new GridFsStorage({
//   url: 'mongodb+srv://dooper:zaKnkcwomfgnzy0j@cluster0.baaa2xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
//   file: (req, file) => {
//     return {
//       filename: Date.now() + '-' + file.originalname,
//       bucketName: 'uploads' // This should match the GridFS bucket name
//     };
//   }
// });

// const upload = multer({ storage: storage });

// // Function to fetch file and stream it to the client
// const getFile = async (filename, res) => {
//   try {
//     const files = await gridFSBucket.find({ filename }).toArray();

//     if (!files || files.length === 0) {
//       return res.status(404).json({ error: 'No files exist' });
//     }

//     gridFSBucket.openDownloadStreamByName(filename).pipe(res);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error', details: error.message });
//   }
// };

// // Route to get user details based on mobile number
// router.get('/mobile/:mobileNumber', async (req, res) => {
//   try {
//     const User1 = createUser1(req.db);
//     const { mobileNumber } = req.params;
//     const user = await User1.findOne({ mobile: mobileNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({
//       aadharCard: user.aadharCard,
//       panCard: user.panCard,
//       pharmacyLicense: user.pharmacyLicense,
//       pharmacyEstablishedLicense: user.pharmacyEstablishedLicense,
//       nablLicense: user.nablLicense,
//       gstCertificate: user.gstCertificate
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Route to download the file
// router.get('/file/:filename', async (req, res) => {
//   const { filename } = req.params;
//   await getFile(filename, res);
// });

// // Function to handle PATCH or PUT requests for updating documents
// const handlePatchOrPut = async (req, res) => {
//   try {
//     const User1 = createUser1(req.db);
//     const { mobileNumber } = req.params;
//     const user = await User1.findOne({ mobile: mobileNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update fields if new values are provided
//     if (req.files.aadharCard) {
//       user.aadharCard = req.files.aadharCard[0].filename; // Save the filename instead of path
//     }
//     if (req.files.panCard) {
//       user.panCard = req.files.panCard[0].filename; // Save the filename instead of path
//     }
//     if (req.files.pharmacyLicense) {
//       user.pharmacyLicense = req.files.pharmacyLicense[0].filename; // Save the filename instead of path
//     }
//     if (req.files.pharmacyEstablishedLicense) {
//       user.pharmacyEstablishedLicense = req.files.pharmacyEstablishedLicense[0].filename; // Save the filename instead of path
//     }
//     if (req.files.nablLicense) {
//       user.nablLicense = req.files.nablLicense[0].filename; // Save the filename instead of path
//     }
//     if (req.files.gstCertificate) {
//       user.gstCertificate = req.files.gstCertificate[0].filename; // Save the filename instead of path
//     }

//     const updatedUser = await user.save();
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Routes for uploading and updating documents
// router.patch('/mobile/:mobileNumber', upload.fields([
//   { name: 'aadharCard', maxCount: 1 },
//   { name: 'panCard', maxCount: 1 },
//   { name: 'pharmacyLicense', maxCount: 1 },
//   { name: 'pharmacyEstablishedLicense', maxCount: 1 },
//   { name: 'nablLicense', maxCount: 1 },
//   { name: 'gstCertificate', maxCount: 1 }
// ]), handlePatchOrPut);

// router.put('/mobile/:mobileNumber', upload.fields([
//   { name: 'aadharCard', maxCount: 1 },
//   { name: 'panCard', maxCount: 1 },
//   { name: 'pharmacyLicense', maxCount: 1 },
//   { name: 'pharmacyEstablishedLicense', maxCount: 1 },
//   { name: 'nablLicense', maxCount: 1 },
//   { name: 'gstCertificate', maxCount: 1 }
// ]), handlePatchOrPut);

// export default router;



// routes/documentsRoutes.js
import express from 'express';
import createUser1 from '../models/User1.js';
import multer from 'multer';
import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import dotenv from  'dotenv'

dotenv.config()


const router = express.Router();

// MongoDB connection string
// const MONGO_URI = 'mongodb+srv://dooper:zaKnkcwomfgnzy0j@cluster0.baaa2xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a new connection using the connection string
const conn = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Set the collection to 'uploads'
});

// Set up GridFs storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI, // Provide the connection link directly here
  file: (req, file) => {
    return {
      filename: Date.now() + '-' + file.originalname,
      bucketName: 'uploads', // Should match the collection name
    };
  },
});

const upload = multer({ storage: storage });

// Helper function to get file by filename
const getFile = async (filename, res) => {
  try {
    const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    const files = await gfs.find({ filename }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'No files exist' });
    }

    gfs.openDownloadStreamByName(filename).pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Route to get user details by mobile number
router.get('/mobile/:mobileNumber', async (req, res) => {
  try {
    const User1= createUser1(req.conn1)
    const { mobileNumber } = req.params;
    const user = await User1.findOne({ mobile: mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      aadharCard: user.aadharCard,
      panCard: user.panCard,
      pharmacyLicense: user.pharmacyLicense,
      pharmacyEstablishedLicense: user.pharmacyEstablishedLicense,
      nablLicense: user.nablLicense,
      gstCertificate: user.gstCertificate,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to get a file by its filename
router.get('/file/:filename', async (req, res) => {
  
  const { filename } = req.params;
  await getFile(filename, res);
});

// Function to handle PATCH or PUT requests for updating user files
const handlePatchOrPut = async (req, res) => {
  try {
    const User1= createUser1(req.conn1)

    const { mobileNumber } = req.params;
    const user = await User1.findOne({ mobile: mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if new files are provided
    if (req.files.aadharCard) {
      user.aadharCard = req.files.aadharCard[0].filename;
    }
    if (req.files.panCard) {
      user.panCard = req.files.panCard[0].filename;
    }
    if (req.files.pharmacyLicense) {
      user.pharmacyLicense = req.files.pharmacyLicense[0].filename;
    }
    if (req.files.pharmacyEstablishedLicense) {
      user.pharmacyEstablishedLicense = req.files.pharmacyEstablishedLicense[0].filename;
    }
    if (req.files.nablLicense) {
      user.nablLicense = req.files.nablLicense[0].filename;
    }
    if (req.files.gstCertificate) {
      user.gstCertificate = req.files.gstCertificate[0].filename;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Routes for updating user documents using PATCH or PUT
router.patch('/mobile/:mobileNumber', upload.fields([
  { name: 'aadharCard', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'pharmacyLicense', maxCount: 1 },
  { name: 'pharmacyEstablishedLicense', maxCount: 1 },
  { name: 'nablLicense', maxCount: 1 },
  { name: 'gstCertificate', maxCount: 1 },
]), handlePatchOrPut);

router.put('/mobile/:mobileNumber', upload.fields([
  { name: 'aadharCard', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'pharmacyLicense', maxCount: 1 },
  { name: 'pharmacyEstablishedLicense', maxCount: 1 },
  { name: 'nablLicense', maxCount: 1 },
  { name: 'gstCertificate', maxCount: 1 },
]), handlePatchOrPut);

export default router;
