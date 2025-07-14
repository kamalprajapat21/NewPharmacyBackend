// backend/routes/timerRoutes.js
import express from 'express';
import { fetchTime } from '../controllers/timerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to fetch hours, minutes, seconds
router.get('/', fetchTime);

export default router;
