import express from 'express';
// import { createEarning } from '../controllers/withdrawController.js';
import { updateWithdrawStatus } from '../controllers/withdrawController2.js';
// import { addAmount, updateWithdrawStatus } from '../controllers/withdrawController.js';

const router = express.Router();

// router.post('/', createEarning);
// router.post('/add', addAmount);
router.post('/update-status2', updateWithdrawStatus);

export default router;
