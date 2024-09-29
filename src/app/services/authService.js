import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

const createUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  const user = new User({
    ...userData,
    password: hashedPassword
  });
  await user.save();
  return user;
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export { generateToken, hashPassword, verifyPassword, createUser, findUserByEmail };