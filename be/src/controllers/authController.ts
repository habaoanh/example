
import { Request, Response } from 'express';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// --- Validation Schemas ---
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  display_name: Joi.string().min(3).max(30).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateProfileSchema = Joi.object({
  display_name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(), // Only if user wants to change password
});

// --- Helper: Generate JWT ---
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/v1/auth/register
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, password, display_name } = value;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Người dùng đã tồn tại' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password_hash,
      display_name,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        display_name: user.display_name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString()),
      },
      message: 'Đăng ký thành công'
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/v1/auth/login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, password } = value;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      res.json({
        success: true,
        data: {
          _id: user._id,
          display_name: user.display_name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id.toString()),
        },
        message: 'Đăng nhập thành công'
      });
    } else {
      res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không đúng' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/auth/profile
// @access  Private
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { error, value } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const user = req.user; // User object from protect middleware

    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }

    // Check if email is being updated and if it's unique
    if (value.email && value.email !== user.email) {
      const userWithNewEmail = await User.findOne({ email: value.email });
      if (userWithNewEmail) {
        return res.status(400).json({ success: false, message: 'Email đã được sử dụng bởi người khác.' });
      }
      user.email = value.email;
    }

    if (value.display_name) {
      user.display_name = value.display_name;
    }

    if (value.password) {
      const salt = await bcrypt.genSalt(10);
      user.password_hash = await bcrypt.hash(value.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        display_name: updatedUser.display_name,
        email: updatedUser.email,
        role: updatedUser.role,
        token: generateToken(updatedUser._id.toString()),
      },
      message: 'Cập nhật hồ sơ thành công'
    });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};
