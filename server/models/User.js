import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName:       { type: String, required: true },
  email:          { type: String, required: true, unique: true },
  password:       { type: String, required: true },
  role:           { type: String, enum: ['seeker','recruiter'], default: 'seeker' },
  phone:          String,
  location:       String,
  resumeHeadline: String,
  linkedinUrl:    String,
  githubUrl:      String,
  skills:         [String],
  education: [{
    institution: String, degree: String,
    field: String, startYear: Number, endYear: Number,
  }],
  experience: [{
    company: String, role: String,
    duration: String, description: String,
  }],
  projects: [{
    title: String, description: String,
    techStack: [String], link: String,
  }],
  certifications: [{
    name: String, issuer: String, year: Number,
  }],
  resumeUrl:      String,
  resumePublicId: String,
}, { timestamps: true });

export default mongoose.model('User', UserSchema);