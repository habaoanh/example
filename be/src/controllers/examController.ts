import { Request, Response } from 'express';
import Exam from '../models/Exam'; // Corrected the import path

// @desc    Create a new exam
// @route   POST /api/exams
// @access  Private (Admin/Teacher)
export const createExam = async (req: Request, res: Response) => {
    try {
        const newExam = new Exam(req.body);
        const savedExam = await newExam.save();
        res.status(201).json(savedExam);
    } catch (error) {
        res.status(500).json({ message: 'Error creating exam', error });
    }
};

// @desc    Get all exams (with filtering options)
// @route   GET /api/exams
// @access  Public
export const getAllExams = async (req: Request, res: Response) => {
    try {
        // Basic filtering can be added here later, e.g., by grade, subject
        const exams = await Exam.find({});
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exams', error });
    }
};

// @desc    Get a single exam by ID
// @route   GET /api/exams/:id
// @access  Public
export const getExamById = async (req: Request, res: Response) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exam', error });
    }
};

// @desc    Update an exam
// @route   PUT /api/exams/:id
// @access  Private (Admin/Teacher)
export const updateExam = async (req: Request, res: Response) => {
    try {
        const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedExam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json(updatedExam);
    } catch (error) {
        res.status(500).json({ message: 'Error updating exam', error });
    }
};

// @desc    Delete an exam
// @route   DELETE /api/exams/:id
// @access  Private (Admin/Teacher)
export const deleteExam = async (req: Request, res: Response) => {
    try {
        const deletedExam = await Exam.findByIdAndDelete(req.params.id);
        if (!deletedExam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.status(200).json({ message: 'Exam deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting exam', error });
    }
};
