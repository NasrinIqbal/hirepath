import express from 'express';
import { getJobs, getJob, createJob } from '../controllers/jobController.js';
import { protect, isRecruiter } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/',     getJobs);
router.get('/:id',  getJob);
router.post('/',    protect, isRecruiter, createJob);
export default router;