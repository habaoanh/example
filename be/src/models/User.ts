
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
  password_hash: { type: String, required: true }, // Store bcrypt hash
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

  // Replaces the old User_Badges table
  earned_badges: [{
    badge_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge' },
    unlocked_at: { type: Date, default: Date.now }
  }]
}, { timestamps: true }); // Automatically creates createdAt and updatedAt

const User = mongoose.model('User', userSchema);

export default User;
