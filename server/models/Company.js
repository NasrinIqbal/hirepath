import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name:        { type: String, required: true },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  logo:        String,
  website:     String,
  description: String,
  industry:    String,
}, { timestamps: true });

export default mongoose.model('Company', CompanySchema);