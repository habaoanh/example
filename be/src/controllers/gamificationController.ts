
import { Request, Response } from 'express';
import Joi from 'joi';
import User from '../models/User';
import Badge from '../models/Badge'; // Import Badge model

// --- Validation Schema ---
const updateProgressSchema = Joi.object({
  xp_earned: Joi.number().integer().min(0).required(),
  // Could add more fields here like: question_id, is_correct, difficulty, etc.
});

// @desc    Update user's XP and streak progress and award badges
// @route   POST /api/v1/gamification/update-progress
// @access  Private
export const updateUserProgress = async (req: Request, res: Response) => {
  try {
    const { error, value } = updateProgressSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { xp_earned } = value;

    const user = req.user; // User object from protect middleware

    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' });
    }

    // Update total XP
    user.total_xp += xp_earned;

    // Update streak logic
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    if (user.last_study_date) {
      const lastStudyDay = new Date(user.last_study_date);
      lastStudyDay.setHours(0, 0, 0, 0); // Normalize to start of day

      const diffTime = Math.abs(today.getTime() - lastStudyDay.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Studied on consecutive days
        user.current_streak += 1;
      } else if (diffDays > 1) {
        // Gap in study days, reset streak
        user.current_streak = 1;
      }
      // If diffDays === 0, means studied multiple times today, streak doesn't change yet
    } else {
      // First study ever
      user.current_streak = 1;
    }

    // Update longest streak
    if (user.current_streak > user.longest_streak) {
      user.longest_streak = user.current_streak;
    }

    // Update last study date (only if it's a new day of study)
    if (!user.last_study_date || today.getTime() > new Date(user.last_study_date).setHours(0,0,0,0)) {
        user.last_study_date = today;
    }

    // --- Badge Awarding Logic ---
    const allBadges = await Badge.find({});
    const newlyEarnedBadges: any[] = [];

    for (const badge of allBadges) {
      const hasBadge = user.earned_badges.some((eb: any) => eb.badge_id.equals(badge._id));

      if (!hasBadge) {
        let earned = false;
        if (badge.requirement_type === 'XP_REACHED' && user.total_xp >= badge.requirement_value) {
          earned = true;
        } else if (badge.requirement_type === 'STREAK_REACHED' && user.current_streak >= badge.requirement_value) {
          earned = true;
        }
        // TODO: Add 'PERFECT_SCORE' logic when question attempt data is available

        if (earned) {
          user.earned_badges.push({ badge_id: badge._id, unlocked_at: new Date() });
          newlyEarnedBadges.push(badge);
        }
      }
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        total_xp: updatedUser.total_xp,
        current_streak: updatedUser.current_streak,
        longest_streak: updatedUser.longest_streak,
        last_study_date: updatedUser.last_study_date,
        earned_badges: updatedUser.earned_badges,
        newly_earned_badges: newlyEarnedBadges,
      },
      message: 'Cập nhật tiến độ và huy hiệu thành công'
    });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};

// @desc    Get the top 10 leaderboard
// @route   GET /api/v1/gamification/leaderboard
// @access  Public
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await User.find({})
      .sort({ total_xp: -1 })
      .limit(10)
      .select('display_name total_xp');

    res.json({
      success: true,
      data: leaderboard,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
};
