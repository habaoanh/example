import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Add a custom 'user' property to the Express Request type using intersection
type AuthRequest = Request & {
  user?: any;
};

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      // Get user from the token and attach to request
      req.user = await User.findById(decoded.id).select('-password_hash');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next(); // Proceed to the next middleware/controller
    } catch (error) {
      console.error(error); // Log the actual error for debugging
      res.status(401);
      // Pass a generic error to the next middleware
      next(new Error('Not authorized, token failed')); 
    }
  } else {
    res.status(401);
    next(new Error('Not authorized, no token'));
  }
};

// Middleware for role-based authorization
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403); // Forbidden
      next(new Error(`User role '${req.user?.role}' is not authorized to access this route`));
    }
    next();
  };
};
