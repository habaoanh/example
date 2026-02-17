
import express from 'express';
import { updateUserProgress, getLeaderboard } from '../controllers/gamificationController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/update-progress', protect, updateUserProgress);
router.get('/leaderboard', getLeaderboard);

export default router;
