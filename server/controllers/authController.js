import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ fullName, email, password: hashed, role });
    const { password: _, ...userData } = user._doc;
    res.status(201).json({ token: signToken(user._id), user: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Invalid email or password' });
    const { password: _, ...userData } = user._doc;
    res.json({ token: signToken(user._id), user: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};