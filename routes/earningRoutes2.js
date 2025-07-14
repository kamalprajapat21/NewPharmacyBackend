// backend/routes/earningRoutes.js
import express from 'express';
import { getEarnings} from '../controllers/earningController.js';
import { getAvailable } from '../controllers/AvailableController2.js';

const router = express.Router();

router.post('/total2', getEarnings);
router.post('/available2', getAvailable);
router.get('/history2'); // New route

export default router;

