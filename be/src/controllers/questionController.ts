
import { Request, Response } from 'express';
import Joi from 'joi';
import Question from '../models/Question';

// --- Validation Schemas ---
const questionSchema = Joi.object({
  parent_id: Joi.string().allow(null),
  grade: Joi.number().min(6).max(12).required(),
  chapter_id: Joi.string().required(),
  difficulty: Joi.number().min(1).max(4).required(),
  type: Joi.string().valid('SELECT', 'INPUT', 'INFO_ONLY').required(),
  content: Joi.string().required(),
  options: Joi.array().items(Joi.object({
    id: Joi.string(),
    text: Joi.string()
  })).when('type', { is: 'SELECT', then: Joi.required() }),
  correct_answer: Joi.array().items(Joi.string()).required(),
  explanation: Joi.string().allow('')
});

// @desc    Create a new question
// @route   POST /api/v1/questions
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { error, value } = questionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const question = await Question.create(value);
    res.status(201).json({ success: true, data: question, message: 'Tạo câu hỏi thành công' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// @desc    Get all questions (with Pagination, Sorting, Filtering)
// @route   GET /api/v1/questions
export const getQuestions = async (req: Request, res: Response) => {
  try {
    // 1. Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering (for operators like gte, gt, lte, lt)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Question.find(JSON.parse(queryStr));

    // 2. Sorting
    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3. Field Limiting (Security check)
    // Rule: Hide correct_answer from students
    const isAdminOrTeacher = req.user && ['ADMIN', 'TEACHER'].includes(req.user.role);
    
    if (req.query.fields) {
      let fields = (req.query.fields as string).split(',').join(' ');
      // If student, remove correct_answer even if they requested it
      if (!isAdminOrTeacher) {
        fields = fields.replace('correct_answer', '').trim();
      }
      query = query.select(fields);
    } else {
      if (!isAdminOrTeacher) {
        query = query.select('-correct_answer');
      }
    }

    // 4. Pagination
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // Execute query
    const questions = await query;
    const total = await Question.countDocuments(JSON.parse(queryStr));

    res.json({
      success: true,
      count: questions.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: questions
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// @desc    Get single question
// @route   GET /api/v1/questions/:id
export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const isAdminOrTeacher = req.user && ['ADMIN', 'TEACHER'].includes(req.user.role);
    let query = Question.findById(req.params.id);

    if (!isAdminOrTeacher) {
      query = query.select('-correct_answer');
    }

    const question = await query;
    if (!question) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy câu hỏi' });
    }
    res.json({ success: true, data: question });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// @desc    Update question
// @route   PUT /api/v1/questions/:id
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!question) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy câu hỏi' });
    }
    res.json({ success: true, data: question, message: 'Cập nhật thành công' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// @desc    Delete question
// @route   DELETE /api/v1/questions/:id
export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy câu hỏi' });
    }
    res.json({ success: true, message: 'Xóa câu hỏi thành công' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};
