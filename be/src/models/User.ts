
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  password_hash: { type: String, required: true }, // Store bcrypt hash
  display_name: { type: String, required: true },
  role: { type: String, enum: ['STUDENT', 'TEACHER', 'ADMIN'], default: 'STUDENT' },

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
