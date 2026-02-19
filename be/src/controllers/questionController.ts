
import { Request, Response } from 'express';
import Joi from 'joi';
import Question from '../models/Question';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-3-flash-preview";
const API_KEY = process.env.GEMINI_API_KEY || '';

if (!API_KEY) {
  console.error("FATAL ERROR: GEMINI_API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

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


// @desc    Analyze a raw text question using AI
// @route   POST /api/questions/analyzebyai
export const analyzeQuestionWithAI = async (req: Request, res: Response) => {
    const { rawInput } = req.body;

    if (!API_KEY) {
        return res.status(500).json({ success: false, message: 'Lỗi cấu hình server: Khóa API cho dịch vụ AI chưa được thiết lập.' });
    }

    if (!rawInput || typeof rawInput !== 'string') {
        return res.status(400).json({ success: false, message: 'Nội dung đầu vào không hợp lệ hoặc bị trống.' });
    }

    const prompt = `Your task is to act as a Math Subject Matter Expert. Analyze the following Vietnamese math problem and structure it into a single, valid JSON object. 

RULES:
- Your response MUST be ONLY the JSON object. Do not include any explanatory text, markdown like ''''json, or any content outside of the JSON structure.
- Preserve ALL mathematical formulas in their original LaTeX format, enclosed in $...$ or $$...$$ markers. Do not escape backslashes or newlines within the JSON string values.
- The JSON object must follow this exact structure:
{
  "content": "The full question text, with LaTeX preserved.",
  "grade": "String (e.g., 'Khối 12')",
  "topic": "String (e.g., 'Hàm số & Đồ thị')",
  "difficulty": "One of: 'Dễ', 'Trung bình', 'Khó'",
  "tags": ["Array", "of", "strings"],
  "options": [{ "value": "Option text with LaTeX", "isCorrect": boolean }],
  "solution": "Detailed solution with LaTeX",
  "notes": "Key concepts and important notes with LaTeX",
  "imageUrl": "URL string to a relevant image if described or clearly implied, otherwise null"
}

Here is the math problem content to analyze:`;

    const generationConfig = {
        temperature: 0.3,
        topK: 1,
        topP: 1,
        // A compromise to balance between completeness and speed to avoid potential environment timeouts
        maxOutputTokens: 4096, 
    };

    const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    try {
        const parts = [
            { text: prompt },
            { text: rawInput.trim() },
        ];

        const result = await model.generateContent({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });

        const jsonText = result.response.text();

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(jsonText);
        } catch (parseError: any) {
            console.error("JSON Parsing Error:", parseError.message);
            console.error("Raw text that failed parsing:", jsonText);
            return res.status(500).json({ 
                success: false, 
                message: "Lỗi phân tích phản hồi từ AI. Phản hồi không phải là JSON hợp lệ.",
                rawResponse: jsonText
            });
        }

        res.status(200).json({ success: true, data: parsedResponse });

    } catch (error: any) {
        console.error("Error during AI content generation:", error.message);
        res.status(500).json({ 
            success: false, 
            message: `Lỗi từ server khi gọi AI: ${error.message}`,
            details: error.stack 
        });
    }
};


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
    // @ts-ignore
    const isAdminOrTeacher = req.user && ['ADMIN', 'TEACHER'].includes(req.user.role);
    
    if (req.query.fields) {
      let fields = (req.query.fields as string).split(',').join(' ');
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
    // @ts-ignore
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
      return res.status(404).json({ success: false, message: 'Xóa câu hỏi thành công' });
    }
    res.json({ success: true, message: 'Xóa câu hỏi thành công' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};
