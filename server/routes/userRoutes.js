import express from 'express';
import { getMe, updateMe, getScores, uploadResume } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadResume as uploadMiddleware } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/me',     protect, getMe);
router.put('/me',     protect, updateMe);
router.get('/scores', protect, getScores);
router.post('/resume', protect, uploadMiddleware.single('resume'), uploadResume);

export default router;