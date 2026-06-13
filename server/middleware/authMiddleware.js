import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const isRecruiter = (req, res, next) => {
  if (req.user?.role !== 'recruiter')
    return res.status(403).json({ message: 'Recruiter access only' });
  next();
};

export const isSeeker = (req, res, next) => {
  if (req.user?.role !== 'seeker')
    return res.status(403).json({ message: 'Seeker access only' });
  next();
};