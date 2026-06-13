import express from 'express';
import { saveJob, unsaveJob, getSavedJobs } from '../controllers/savedJobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/',              protect, saveJob);
router.delete('/:jobId',      protect, unsaveJob);
router.get('/',               protect, getSavedJobs);
export default router;