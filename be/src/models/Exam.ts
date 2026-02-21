import mongoose, { Document, Schema } from 'mongoose';

// Interface for the question reference within a section
interface ISectionQuestion {
    question_id: mongoose.Schema.Types.ObjectId;
    order: number;
    custom_point?: number;
}

// Interface for a section
interface IExamSection {
    section_name: string;
    section_description?: string;
    questions: ISectionQuestion[];
}

// Interface for the main Exam document
export interface IExam extends Document {
    exam_metadata: {
        title: string;
        description?: string;
        duration: number; // in minutes
        total_points: number;
        pass_score?: number;
        grade: string;
        subject: string;
        status: 'draft' | 'published' | 'archived';
        access_level: 'public' | 'premium'; // <-- Added this line
    };
    structure: IExamSection[];
    created_at: Date;
    updated_at: Date;
}

// Schema for the question reference (Subdocument)
const SectionQuestionSchema: Schema = new Schema({
    question_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question', 
        required: true 
    },
    order: { 
        type: Number, 
        required: true 
    },
    custom_point: { 
        type: Number 
    }
}, { _id: false });

// Schema for a section (Subdocument)
const ExamSectionSchema: Schema = new Schema({
    section_name: { 
        type: String, 
        required: true 
    },
    section_description: { 
        type: String 
    },
    questions: [SectionQuestionSchema]
}, { _id: false });

// Main Exam Schema
const ExamSchema: Schema = new Schema({
    exam_metadata: {
        title: { type: String, required: true },
        description: { type: String },
        duration: { type: Number, required: true },
        total_points: { type: Number, default: 10.0 },
        pass_score: { type: Number },
        grade: { type: String, required: true },
        subject: { type: String, required: true },
        status: { 
            type: String, 
            enum: ['draft', 'published', 'archived'], 
            default: 'draft' 
        },
        // Added this block
        access_level: {
            type: String,
            enum: ['public', 'premium'],
            default: 'public'
        }
    },
    structure: [ExamSectionSchema]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Exam = mongoose.model<IExam>('Exam', ExamSchema);

export default Exam;
