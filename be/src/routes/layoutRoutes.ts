import express from 'express';
import * as layoutController from '../controllers/layoutController';

const router = express.Router();

// Route for navigation items
router.get('/navigation', layoutController.getNavigationItems);

export default router;