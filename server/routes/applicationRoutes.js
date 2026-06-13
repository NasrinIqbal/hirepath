import express from 'express';
import { applyJob, getMyApplications } from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/',     protect, applyJob);
router.get('/mine',  protect, getMyApplications);
export default router;