import express from 'express';
import { getAlert, clearAllAlerts } from "../controllers/alertController.js";

const router = express.Router();

router.post('/', getAlert);
router.put('/clearAll', clearAllAlerts);

export default router;
