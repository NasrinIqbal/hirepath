import express from 'express';
import { getAnalytics, getMyJobs, createJob, updateJob, deleteJob, getApplicants, updateStatus } from '../controllers/recruiterController.js';
import { protect, isRecruiter } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect, isRecruiter);

router.get('/analytics',              getAnalytics);
router.get('/jobs',                   getMyJobs);
router.post('/jobs',                  createJob);
router.put('/jobs/:id',               updateJob);
router.delete('/jobs/:id',            deleteJob);
router.get('/jobs/:jobId/applicants', getApplicants);
router.put('/applications/:id/status', updateStatus);
export default router;