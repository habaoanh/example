
import express from 'express';
import { registerUser, loginUser, updateUserProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.route('/me').get(protect, (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});
router.route('/profile').put(protect, updateUserProfile);

export default router;
