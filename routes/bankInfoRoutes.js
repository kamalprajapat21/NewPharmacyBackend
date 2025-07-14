// import express from 'express';
// import multer from 'multer';
// import User1 from '../models/User1.js';
// import mongoose from 'mongoose';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import Grid from 'gridfs-stream';

// const router = express.Router();

// const conn = mongoose.connection;
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Set up storage engine
// const storage = new GridFsStorage({
//   url: 'mongodb+srv://pharmacy:IRH5Pe9roBEpryh3@pharmacycluster.nllme1p.mongodb.net/?retryWrites=true&w=majority&appName=pharmacyCluster',
//   file: (req, file) => {
//     return {
//       filename: Date.now() + '-' + file.originalname,
//       bucketName: 'uploads' // Should match the collection name
//     };
//   }
// });

// const upload = multer({ storage: storage });

// const getFile = async (filename, res) => {
//   try {
//     const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//       bucketName: 'uploads'
//     });

//     const files = await gfs.find({ filename }).toArray();

//     if (!files || files.length === 0) {
//       return res.status(404).json({ error: 'No files exist' });
//     }

//     gfs.openDownloadStreamByName(filename).pipe(res);
//   } catch (error) {
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// router.post('/', upload.single('uploadbankstatement'), async (req, res) => {
//   try {
//     const { mobile, bankName, accountNumber, ifscCode } = req.body;
//     const user = await User1.findOne({ mobile });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.bankName = bankName;
//     user.accountNumber = accountNumber;
//     user.ifscCode = ifscCode;
//     if (req.file) {
//       user.uploadbankstatement = req.file.filename; // Save the filename instead of path
//     }

//     const savedUser = await user.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.get('/mobile/:mobileNumber', async (req, res) => {
//   try {
//     const { mobileNumber } = req.params;
//     const user = await User1.findOne({ mobile: mobileNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({
//       bankName: user.bankName,
//       accountNumber: user.accountNumber,
//       ifscCode: user.ifscCode,
//       uploadbankstatement: user.uploadbankstatement
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// const handlePatchOrPut = async (req, res) => {
//   try {
//     const { mobileNumber } = req.params;
//     const user = await User1.findOne({ mobile: mobileNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.bankName = req.body.bankName || user.bankName;
//     user.accountNumber = req.body.accountNumber || user.accountNumber;
//     user.ifscCode = req.body.ifscCode || user.ifscCode;

//     if (req.file) {
//       user.uploadbankstatement = req.file.filename; // Save the filename instead of path
//     }

//     const updatedUser = await user.save();
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// router.patch('/mobile/:mobileNumber', upload.single('uploadbankstatement'), handlePatchOrPut);

// router.put('/mobile/:mobileNumber', upload.single('uploadbankstatement'), handlePatchOrPut);

// // New route to handle only bank statement image upload and update
// router.put('/bankstatement/:mobileNumber', upload.single('uploadbankstatement'), async (req, res) => {
//   try {
//     const { mobileNumber } = req.params;
//     const user = await User1.findOne({ mobile: mobileNumber });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (req.file) {
//       user.uploadbankstatement = req.file.filename; // Save the filename instead of path
//     } else {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const updatedUser = await user.save();
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// export default router;


// routes/bankInfoRoutes.js
import express from 'express';
import multer from 'multer';
import createUser1 from '../models/User1.js';
import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import dotenv from  'dotenv'

dotenv.config()

const router = express.Router();

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Set up storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: Date.now() + '-' + file.originalname,
      bucketName: 'uploads' // Should match the collection name
    };
  }
});

const upload = multer({ storage: storage });

const getFile = async (filename, res) => {
  try {
    const User1 = createUser1(req.conn1)
    const gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'uploads'
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

router.post('/', upload.single('uploadbankstatement'), async (req, res) => {
  try {
    const User1 = createUser1(req.conn1)
    const { mobile, bankName, accountNumber, ifscCode } = req.body;
    const user = await User1.findOne({ mobile });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bankName = bankName;
    user.accountNumber = accountNumber;
    user.ifscCode = ifscCode;
    if (req.file) {
      user.uploadbankstatement = req.file.filename; // Save the filename instead of path
    }

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/mobile/:mobileNumber', async (req, res) => {
  try {
    const User1 = createUser1(req.conn1)
    const { mobileNumber } = req.params;
    const user = await User1.findOne({ mobile: mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      bankName: user.bankName,
      accountNumber: user.accountNumber,
      ifscCode: user.ifscCode,
      uploadbankstatement: user.uploadbankstatement
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

const handlePatchOrPut = async (req, res) => {
  try {
    const User1 = createUser1(req.conn1)
    const { mobileNumber } = req.params;
    const user = await User1.findOne({ mobile: mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bankName = req.body.bankName || user.bankName;
    user.accountNumber = req.body.accountNumber || user.accountNumber;
    user.ifscCode = req.body.ifscCode || user.ifscCode;

    if (req.file) {
      user.uploadbankstatement = req.file.filename; // Save the filename instead of path
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

router.patch('/mobile/:mobileNumber', upload.single('uploadbankstatement'), handlePatchOrPut);

router.put('/mobile/:mobileNumber', upload.single('uploadbankstatement'), handlePatchOrPut);

// New route to handle only bank statement image upload and update
router.put('/bankstatement/:mobileNumber', upload.single('uploadbankstatement'), async (req, res) => {
  try {
    const User1 = createUser1(req.conn1)
    const { mobileNumber } = req.params;
    const user = await User1.findOne({ mobile: mobileNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.file) {
      user.uploadbankstatement = req.file.filename; // Save the filename instead of path
    } else {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
