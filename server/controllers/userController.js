import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';

export const getMe = async (req, res) => {
  res.json(req.user);
};

export const updateMe = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id, req.body, { new: true }
    ).select('-password');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getScores = async (req, res) => {
  const user = req.user;

  const checks  = [user.fullName, user.phone, user.location, user.resumeHeadline, user.resumeUrl, user.skills?.length, user.education?.length, user.experience?.length, user.projects?.length, user.certifications?.length, user.githubUrl];
  const weights = [10, 5, 5, 10, 15, 15, 10, 10, 10, 5, 5];
  const profileStrength = checks.reduce((sum, v, i) => sum + (v ? weights[i] : 0), 0);

  let careerReadiness = 0;
  const recommendations = [];
  if (user.skills?.length >= 5) careerReadiness += 20; else recommendations.push(`Add ${5 - (user.skills?.length || 0)} more skills`);
  if (user.projects?.length >= 2) careerReadiness += 20; else recommendations.push(`Add ${2 - (user.projects?.length || 0)} project(s)`);
  if (user.resumeUrl) careerReadiness += 20; else recommendations.push('Upload your resume');
  if (user.certifications?.length >= 1) careerReadiness += 15; else recommendations.push('Add a certification');
  if (user.education?.length >= 1) careerReadiness += 15; else recommendations.push('Add your education');
  if (user.githubUrl) careerReadiness += 10; else recommendations.push('Add your GitHub URL');

  let resumeScore = 0;
  const suggestions = [];
  if (user.resumeUrl) resumeScore += 20; else suggestions.push('Upload a PDF resume');
  if (user.resumeHeadline?.length > 20) resumeScore += 10; else suggestions.push('Write a stronger headline');
  if (user.skills?.length >= 5) resumeScore += 20; else suggestions.push('Add 5+ skills');
  if (user.projects?.length >= 2) resumeScore += 20; else suggestions.push('Add 2+ projects');
  if (user.certifications?.length) resumeScore += 10; else suggestions.push('Add certifications');
  if (user.githubUrl) resumeScore += 10; else suggestions.push('Add GitHub URL');
  if (user.linkedinUrl) resumeScore += 10; else suggestions.push('Add LinkedIn URL');

  res.json({ profileStrength, careerReadiness, resumeScore, recommendations, suggestions });
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'raw', folder: 'hirepath/resumes', format: 'pdf' },
        (error, result) => error ? reject(error) : resolve(result)
      ).end(req.file.buffer);
    });

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { resumeUrl: result.secure_url, resumePublicId: result.public_id },
      { new: true }
    ).select('-password');

    res.json({ resumeUrl: result.secure_url, user: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};