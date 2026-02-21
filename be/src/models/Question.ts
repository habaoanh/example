import mongoose from 'mongoose';

const subQuestionSchema = new mongoose.Schema({
  content: { type: String, required: true }, // Markdown + LaTeX
  type: { type: String, enum: ['Trắc nghiệm', 'Tự luận'], required: true },
  difficulty: { 
    type: String, 
    required: true, 
    enum: ['Nhận biết', 'Thông hiểu', 'Vận dụng', 'Vận dụng cao']
  },
  options: [{
    value: { type: String },
    isCorrect: { type: Boolean }
  }],
  solution: { type: String }, // Markdown + LaTeX
  point: {type: Number, require: true}
});

const questionSchema = new mongoose.Schema({
  grade: { type: Number, required: true, min: 6, max: 12 },
  chapter_id: { type: String, required: true, index: true },
  topic: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  difficulty: { 
    type: String, 
    required: true, 
    enum: ['Nhận biết', 'Thông hiểu', 'Vận dụng', 'Vận dụng cao']
  },

  type: { type: String, enum: ['Trắc nghiệm', 'Tự luận', 'Câu hỏi chùm'], required: true },
  content: { type: String, required: true }, // Markdown + LaTeX

  // Options are only for 'Trắc nghiệm' type, stored as an array of objects
  options: [{
    value: { type: String },
    isCorrect: { type: Boolean }
  }],
  
  sub_questions: [subQuestionSchema],

  solution: { type: String }, // Markdown + LaTeX

  // Field for storing formulas, keys, or notes for a specific problem type
  notes: { type: String },
  point: {type: Number, require: true}
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

export default Question;
