// backend/routes/earningRoutes.js
import express from 'express';
import { getEarnings} from '../controllers/earningvaccineController.js';
import { getAvailable } from '../controllers/AvailablevaccineController.js';
import { getHistory } from '../controllers/historyvaccineController.js';

const router = express.Router();

router.post('/total', getEarnings);
router.post('/available', getAvailable);
router.post('/history',getHistory); // New route

export default router;

