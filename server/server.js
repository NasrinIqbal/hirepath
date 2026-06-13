import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import savedJobRoutes from './routes/savedJobRoutes.js';
import recruiterRoutes from './routes/recruiterRoutes.js'

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use('/api/auth',         authRoutes);
app.use('/api/users',        userRoutes);
app.use('/api/jobs',         jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/saved', savedJobRoutes);
app.use('/api/recruiter', recruiterRoutes);

app.get('/api', (req, res) => res.json({ message: 'HirePath API running ✅' }));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);