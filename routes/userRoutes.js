// backend/routes/userRoutes.js
import express from 'express';
const router = express.Router();
import { createUser, getUserById } from '../controllers/userController.js';
import { protect } from "../middlewares/authMiddleware.js"

router.post('/createuser', createUser);
router.get('/getuser/:id', getUserById);

export default router;
