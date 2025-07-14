// import express from 'express';
// import { sendOtp, checkOtp } from '../controllers/signupotpController.js';
// import { sendOtp2, checkOtp2 } from '../controllers/loginotpController.js';
// import { Signup1,Signup2,Signup3 } from '../controllers/signupdetailsController.js';
// // import { Signup1,Signup2,Signup3 } from '../controllers/signupdetailsController.js';

// import multer from 'multer';
// import path from 'path';
// import mongoose from 'mongoose';
// import { GridFsStorage } from 'multer-gridfs-storage';
// import Grid from 'gridfs-stream';


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
  
//   const upload = multer({ storage: storage });
// //   const upload = multer({ storage: storage });


// const router = express.Router();

// router.post('/signup/send-otp', sendOtp);
// router.post('/signup/check-otp', checkOtp);

// router.post('/login/send-otp', sendOtp2);
// router.post('/login/check-otp', checkOtp2);

// router.post('/login/check-otp', checkOtp2);

// //serverRoutes
// router.post('/signup1', upload.single('labPhoto'), Signup1);
// router.post('/signup2', upload.fields([
//     { name: 'aadharCard', maxCount: 1 },
//     { name: 'panCard', maxCount: 1 },
//     { name: 'labLicense', maxCount: 1 },
//     { name: 'labEstablishedLicense', maxCount: 1 },
//     { name: 'nablLicense', maxCount: 1 },
//     { name: 'gstCertificate', maxCount: 1 }
//   ]), Signup2);
//   router.post('/signup3', upload.single('uploadbankstatement'), Signup3);
// //serverRoutes

// export default router;

//working with local storage
// routes/authRoutes.js
import express from 'express';
import { checkUserExistanceForSignup,checkUserExistanceForLogin  } from '../controllers/signupotpController.js';
// import { checkuserexistance2 } from '../controllers/loginotpController.js';
import { Signup1,Signup2,Signup3 } from '../controllers/signupdetailsController.js';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import { normalizeMobileNumber } from '../utils/helpers.js';


const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Set up storage engine
const storage = new GridFsStorage({
  url: 'mongodb+srv://dooper:zaKnkcwomfgnzy0j@cluster0.baaa2xr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  file: (req, file) => {
    return {
      filename: Date.now() + '-' + file.originalname,
      bucketName: 'uploads' // Should match the collection name
    };
  }
});
  
  const upload = multer({ storage: storage });
//   const upload = multer({ storage: storage });


const router = express.Router();

router.post('/signup/checkuserexistance', checkUserExistanceForSignup );
// router.post('/signup/check-otp', checkOtp);

router.post('/login/checkuserexistance2', checkUserExistanceForLogin );
// router.post('/login/check-otp', checkOtp2);


//serverRoutes
router.post('/signup1', upload.single('labPhoto'), Signup1);
router.post('/signup2', upload.fields([
    { name: 'aadharCard', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'pharmacyLicense', maxCount: 1 },
    { name: 'pharmacyEstablishedLicense', maxCount: 1 },
    { name: 'nablLicense', maxCount: 1 },
    { name: 'gstCertificate', maxCount: 1 }
  ]), Signup2);
  router.post('/signup3', upload.single('uploadbankstatement'), Signup3);
//serverRoutes

export default router;

