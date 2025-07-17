import express from 'express';
import { getMedicine } from '../controllers/medicineController.js';
import { getvaccine } from '../controllers/vaccinationServiceController.js';

// import { getLab} from '../controllers/labController.js';
// import { getPrescriptionById } from '../controllers/BOOKING/prescriptionController.js';
// import { acceptLab, completeLab, rejectLab } from '../controllers/labController2.js';
// import {  getpendingMedicine } from '../controllers/incomingpendingcompletedController.js';
// import { getPendingbyID } from '../controllers/getpendingbyidController.js';

import { getpendingMedicine,getpendingVaccine } from '../controllers/pendingController.js';
import { getcompletedMedicine,getcompletedVaccine} from '../controllers/completedController.js';
import { getcancelledMedicine,getcancelledVaccine} from '../controllers/cancelledController.js';

import { acceptMedicine, acceptVaccine, rejectMedicine, rejectVaccine,getBookingInfo } from '../controllers/BOOKING/acceptrejectController.js';
import { completeMedicine, completeVaccine } from '../controllers/BOOKING/completeController.js';

import { getCancelled, getPending, getCompleted } from '../controllers/BOOKING/incomingpendingcompletedController.js';
// import { getPendingbyID } from '../controllers/BOOKING/getpendingbyidController.js';
import { getvaccinePendingbyID,getmedicinePendingbyID } from '../controllers/BOOKING/getpendingbyidController.js';
import {getPrescriptionById} from '../controllers/BOOKING/prescriptionController.js'

const router = express.Router();
router.get('/medicine', getMedicine);
router.get('/vaccine', getvaccine);

router.post('/pendingmedicine', getpendingMedicine )
router.post('/pendingvaccine', getpendingVaccine )

router.post('/completedmedicine', getcompletedMedicine )
router.post('/completedvaccine', getcompletedVaccine )

router.post('/cancelledmedicine', getcancelledMedicine )
router.post('/cancelledvaccine', getcancelledVaccine )

router.post('/pending', getPending )
// router.post('/pending', getPending )

// router.post('/pending', getPending )

router.get('/pendingmedicine/:labId', getmedicinePendingbyID )
router.get('/pendingvaccine/:labId', getvaccinePendingbyID )
// router.get('/pending/:labId', getPendingbyID )




router.post('/get-booking-info', getBookingInfo);
router.post('/acceptmedicine', acceptMedicine);
router.post('/acceptvaccine', acceptVaccine);
router.post('/rejectmedicine', rejectMedicine);
router.post('/rejectvaccine', rejectVaccine);
router.post('/completemedicine/:labId', completeMedicine);
router.post('/completevaccine/:labId', completeVaccine);
router.get('/:id',getPrescriptionById)

export default router;
