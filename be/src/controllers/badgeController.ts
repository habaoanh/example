
import { Request, Response } from 'express';
import Joi from 'joi';
import Badge from '../models/Badge';

// --- Validation Schema ---
const badgeSchema = Joi.object({
  name: Joi.string().required(),
  icon_url: Joi.string().uri().required(),
  requirement_type: Joi.string().valid('XP_REACHED', 'STREAK_REACHED', 'PERFECT_SCORE').required(),
  requirement_value: Joi.number().integer().min(0).required()
});

// @desc    Create new badge
// @route   POST /api/v1/badges
// @access  Private/Admin, Teacher
export const createBadge = async (req: Request, res: Response) => {
  try {
    const { error, value } = badgeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const badge = await Badge.create(value);
    res.status(201).json({ success: true, data: badge, message: 'Tạo huy hiệu thành công' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// @desc    Get all badges
// @route   GET /api/v1/badges
// @access  Public
export const getBadges = async (req: Request, res: Response) => {
  try {
    const badges = await Badge.find({});
    res.json({ success: true, data: badges });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// @desc    Get single badge
// @route   GET /api/v1/badges/:id
// @access  Public
export const getBadgeById = async (req: Request, res: Response) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy huy hiệu' });
    }
    res.json({ success: true, data: badge });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// @desc    Update badge
// @route   PUT /api/v1/badges/:id
// @access  Private/Admin, Teacher
export const updateBadge = async (req: Request, res: Response) => {
  try {
    const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!badge) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy huy hiệu' });
    }
    res.json({ success: true, data: badge, message: 'Cập nhật huy hiệu thành công' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// @desc    Delete badge
// @route   DELETE /api/v1/badges/:id
// @access  Private/Admin, Teacher
export const deleteBadge = async (req: Request, res: Response) => {
  try {
    const badge = await Badge.findByIdAndDelete(req.params.id);
    if (!badge) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy huy hiệu' });
    }
    res.json({ success: true, message: 'Xóa huy hiệu thành công' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};
