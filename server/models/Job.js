import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title:           { type: String, required: true },
  company:         { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  postedBy:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description:     String,
  location:        String,
  type:            { type: String, enum: ['full-time','part-time','internship','remote','hybrid'] },
  experienceLevel: { type: String, enum: ['fresher','junior','mid','senior'] },
  salaryMin:       Number,
  salaryMax:       Number,
  requiredSkills:  [String],
  requiredEducation: String,
  isActive:        { type: Boolean, default: true },
  deadline:        Date,
}, { timestamps: true });

export default mongoose.model('Job', JobSchema);