import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  job:       { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status:    {
    type: String,
    enum: ['applied','under_review','shortlisted','interview_scheduled','rejected','selected'],
    default: 'applied',
  },
  matchScore: Number,
}, { timestamps: true });

export default mongoose.model('Application', ApplicationSchema);