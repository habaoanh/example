
import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon_url: { type: String, required: true },
  requirement_type: { type: String, enum: ['XP_REACHED', 'STREAK_REACHED', 'PERFECT_SCORE'], required: true },
  requirement_value: { type: Number, required: true }
});

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
