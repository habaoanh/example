
import express from 'express';
import {
  createBadge,
  getBadges,
  getBadgeById,
  updateBadge,
  deleteBadge
} from '../controllers/badgeController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', getBadges);
router.get('/:id', getBadgeById);

// Admin/Teacher only routes
router.post('/', protect, authorize('ADMIN', 'TEACHER'), createBadge);
router.put('/:id', protect, authorize('ADMIN', 'TEACHER'), updateBadge);
router.delete('/:id', protect, authorize('ADMIN', 'TEACHER'), deleteBadge);

export default router;
