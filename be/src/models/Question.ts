import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  // For grouped questions (câu hỏi chùm)
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', default: null }, 

  grade: { type: Number, required: true, min: 6, max: 12 },
  chapter_id: { type: String, required: true, index: true },
  difficulty: { type: Number, required: true, min: 1, max: 4 },

  type: { type: String, enum: ['Trắc nghiệm', 'Tự luận'], required: true },
  content: { type: String, required: true }, // Markdown + LaTeX

  // Options are only for 'Trắc nghiệm' type, stored as an array of objects
  options: [{
    id: { type: String }, // e.g., "A", "B"
    text: { type: String }
  }],

  correct_answer: [{ type: String }], // Array of correct answers
  explanation: { type: String }, // Markdown + LaTeX

  // Field for storing formulas, keys, or notes for a specific problem type
  notes: { type: String }
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

export default Question;
