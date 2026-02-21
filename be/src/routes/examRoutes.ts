import express from 'express';
import * as examController from '../controllers/examController';

const router = express.Router();

// Maps the controller functions to the routes
router.post('/', examController.createExam);
router.get('/', examController.getAllExams);
router.get('/:id', examController.getExamById);
router.put('/:id', examController.updateExam);
router.delete('/:id', examController.deleteExam);

export default router;
