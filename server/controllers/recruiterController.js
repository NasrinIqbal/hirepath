import Job         from '../models/Job.js';
import Application from '../models/Application.js';
import Company     from '../models/Company.js';

export const getAnalytics = async (req, res) => {
  try {
    const jobs        = await Job.find({ postedBy: req.user._id });
    const jobIds      = jobs.map(j => j._id);
    const applications = await Application.countDocuments({ job: { $in: jobIds } });
    const active      = jobs.filter(j => j.isActive).length;
    res.json({ totalJobs: jobs.length, activeJobs: active, totalApplications: applications });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user._id, isActive: true });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, postedBy: req.user._id },
      req.body, { new: true }
    );
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    await Job.findOneAndDelete({ _id: req.params.id, postedBy: req.user._id });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const apps = await Application.find({ job: req.params.jobId })
      .populate('applicant', '-password')
      .populate('job');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    );
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};