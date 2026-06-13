import SavedJob from '../models/SavedJob.js';

export const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const exists = await SavedJob.findOne({ user: req.user._id, job: jobId });
    if (exists) return res.status(400).json({ message: 'Already saved' });
    const saved = await SavedJob.create({ user: req.user._id, job: jobId });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const unsaveJob = async (req, res) => {
  try {
    await SavedJob.findOneAndDelete({ user: req.user._id, job: req.params.jobId });
    res.json({ message: 'Removed from saved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const saved = await SavedJob.find({ user: req.user._id }).populate('job');
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};