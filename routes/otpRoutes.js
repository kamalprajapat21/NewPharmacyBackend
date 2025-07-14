// //backend/routes/otpRoutes.js
// import express from 'express';
// import { sendOtp, checkOtp } from '../controllers/otpController1.js';
// import { uploadReport} from '../controllers/uploadReport.js';

// const router = express.Router();

// router.post('/send-otp', sendOtp);
// router.post('/check-otp', checkOtp);
// router.post('/uploadreport', uploadReport);

// // router.get('/reports', fetchReports);


// export default router;



//backend/routes/otpRoutes.js
import express from 'express';
import { sendOtp, checkOtp } from '../controllers/otpController1.js';
// import { sendOtp2, checkOtp2 } from '../controllers/otpController12.js';
import { sendotp2,checkotp2 } from '../controllers/otpController12.js';
import { uploadReport,uploadReport2} from '../controllers/uploadReport.js';
import { downloadReport } from '../controllers/downloadReport.js';


const router = express.Router();

router.post('/sendotp/:labId', sendOtp);
router.post('/checkotp/:labId', checkOtp);
router.post('/sendotp2/:labId', sendotp2);
router.post('/checkotp2/:labId', checkotp2);
// router.post('/uploadreport', uploadReport);
router.post('/labreport/:labId', uploadReport);
router.post('/labreport2/:labId', uploadReport2);
router.get('/downloadreport/:labreportId', downloadReport);
// router.get('/downloadreport/:labreportId', downloadReport);

// router.get('/reports', fetchReports);


export default router;

