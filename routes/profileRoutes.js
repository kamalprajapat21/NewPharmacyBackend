//backend/routes/profileRoutes.js
import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import { profileValidationRules, validate } from '../utils/validators.js';
import { createOrUpdateProfile } from '../controllers/profileController.js';

router.post('/',
    authMiddleware,
    profileValidationRules(),
    validate,
    createOrUpdateProfile
);

export default router;
