
import mongoose, { Document, Schema, Types } from 'mongoose';

// Interface defining the User document structure.
// It extends mongoose.Document to include Mongoose-specific properties like _id, save(), etc.
export interface IUser extends Document {
  email?: string | null;
  phone_number?: string | null;
  password_hash: string;
  fullName: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  password_reset_token?: string;
  password_reset_expires?: Date;
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_study_date: Date | null;
  earned_badges: {
    // Use Types.ObjectId for the actual property type on the document
    badge_id: Types.ObjectId;
    unlocked_at: Date;
  }[];
  // Timestamps added by Mongoose
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    index: true,
    sparse: true // Allows null values to not conflict with the unique index
  },
  phone_number: {
    type: String,
    unique: true,
    index: true,
    sparse: true
  },
  password_hash: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, enum: ['STUDENT', 'TEACHER', 'ADMIN'], default: 'STUDENT' },

  // Password Reset
  password_reset_token: { type: String },
  password_reset_expires: { type: Date },

  // Gamification
  total_xp: { type: Number, default: 0 },
  current_streak: { type: Number, default: 0 },
  longest_streak: { type: Number, default: 0 },
  last_study_date: { type: Date, default: null },

  // Badge relationship
  earned_badges: [{
    _id: false, // Don't create a separate _id for this subdocument
    // Use Schema.Types.ObjectId for the schema definition
    badge_id: { type: Schema.Types.ObjectId, ref: 'Badge' },
    unlocked_at: { type: Date, default: Date.now }
  }]
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
