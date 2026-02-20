
import express from 'express';
import { 
  createQuestion, 
  getQuestions, 
  getQuestionById, 
  updateQuestion, 
  deleteQuestion, 
  analyzeQuestionWithAI,
  analyzeQuestionByFile,
  upload
} from '../controllers/questionController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// AI-powered routes
router.post('/analyzebyai', protect, authorize('ADMIN', 'TEACHER'), analyzeQuestionWithAI);
router.post('/analyzebyfile', protect, authorize('ADMIN', 'TEACHER'), upload.single('file'), analyzeQuestionByFile);

// Public/Student routes (can be filtered by grade, chapter, etc.)
router.get('/', getQuestions);
router.get('/:id', getQuestionById);

// Admin/Teacher only routes
router.post('/', protect, authorize('ADMIN', 'TEACHER'), createQuestion);
router.put('/:id', protect, authorize('ADMIN', 'TEACHER'), updateQuestion);
router.delete('/:id', protect, authorize('ADMIN', 'TEACHER'), deleteQuestion);

export default router;
