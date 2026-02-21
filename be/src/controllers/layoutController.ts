import { Request, Response } from 'express';
import NavigationItem from '../models/NavigationItem';

// @desc    Get all navigation items
// @route   GET /api/v1/layout/navigation
// @access  Public
export const getNavigationItems = async (req: Request, res: Response) => {
    try {
        const navItems = await NavigationItem.find({});
        res.status(200).json(navItems);
    } catch (error) { 
        res.status(500).json({ message: 'Error fetching navigation items', error });
    }
};