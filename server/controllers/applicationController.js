import Application from '../models/Application.js';

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const exists = await Application.findOne({ job: jobId, applicant: req.user._id });
    if (exists) return res.status(400).json({ message: 'Already applied' });
    const app = await Application.create({ job: jobId, applicant: req.user._id });
    res.status(201).json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ applicant: req.user._id }).populate('job');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};