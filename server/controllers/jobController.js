import Job from '../models/Job.js';

export const getJobs = async (req, res) => {
  try {
    const { search, type } = req.query;
    let query = { isActive: true };
    if (type) query.type = type;
    if (search) query.$or = [
      { title:          { $regex: search, $options: 'i' } },
      { requiredSkills: { $regex: search, $options: 'i' } },
    ];
    const jobs = await Job.find(query).populate('company').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('company');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user._id });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};