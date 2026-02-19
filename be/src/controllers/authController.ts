
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';

// Add a custom 'user' property to the Express Request type
type AuthRequest = Request & {
  user?: any;
};

// --- Strong Password Regex ---
const passwordRegex = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$');
const passwordErrorMessage = 'Mật khẩu phải dài ít nhất 6 ký tự, chứa ít nhất một chữ số, và một ký tự đặc biệt (!@#$%^&*).';

// --- Validation Schemas ---
const registerSchema = Joi.object({
  email: Joi.string().email().optional(),
  phone_number: Joi.string().optional(),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base': passwordErrorMessage,
  }),
  fullName: Joi.string().min(3).max(30).required(),
}).xor('email', 'phone_number');

const loginSchema = Joi.object({
  email: Joi.string().email().optional(),
  phone_number: Joi.string().optional(),
  password: Joi.string().required(),
}).xor('email', 'phone_number');

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base': passwordErrorMessage,
  }),
});

const updateProfileSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone_number: Joi.string().optional(),
  password: Joi.string().pattern(passwordRegex).optional().messages({
    'string.pattern.base': passwordErrorMessage,
  }),
});

// --- Helpers ---
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// --- Controllers ---

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, phone_number, password, fullName } = value;

    const existingQuery = email ? { email } : { phone_number };
    const userExists = await User.findOne(existingQuery);

    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email hoặc số điện thoại đã tồn tại.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      phone_number,
      fullName,
      password_hash, // Correctly use password_hash
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          phone_number: user.phone_number,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const { email, phone_number, password } = value;

    const user = await User.findOne({ $or: [{ email }, { phone_number }] }).select('+password_hash');

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const token = generateToken(user._id.toString());
      res.json({
        success: true,
        data: {
          user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone_number: user.phone_number,
            role: user.role,
          },
          token,
        },
      });
    } else {
      return res.status(401).json({ success: false, message: 'Email hoặc mật khẩu không chính xác.' });
    }
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // req.user is attached by the 'protect' middleware
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Không được phép, người dùng không tồn tại' });
    }
    
    // The user object is already fetched in middleware, just return it
    const user = req.user;
    res.json({
      success: true,
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Không được phép, người dùng không tồn tại' });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
        }

        const { error, value } = updateProfileSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        user.fullName = value.fullName || user.fullName;
        user.email = value.email || user.email;
        user.phone_number = value.phone_number || user.phone_number;

        if (value.password) {
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(value.password, salt);
        }

        const updatedUser = await user.save();

        res.json({
            success: true,
            data: {
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                phone_number: updatedUser.phone_number,
                role: updatedUser.role,
            },
        });
    } catch (error) {
        next(error);
    }
};


export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = forgotPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const user = await User.findOne({ email: value.email });

    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      
      user.password_reset_token = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      user.password_reset_expires = new Date(Date.now() + 3600000); // 1 hour in ms

      await user.save();

      console.log('PASSWORD RESET TOKEN (DEV ONLY):\n', resetToken);
    }

    res.status(200).json({
      success: true,
      message: 'Nếu email của bạn tồn tại trong hệ thống, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.',
    });

  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  // This will be implemented in the next steps
  res.status(200).json({ success: true, message: 'Password reset endpoint placeholder' });
};
