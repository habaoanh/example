
import express from 'express';
import { 
  registerUser, 
  loginUser, 
  updateUserProfile, 
  getMe, 
  forgotPassword, 
  resetPassword 
} from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateUserProfile);

export default router;
