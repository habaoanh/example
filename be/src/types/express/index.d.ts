
// Import the IUser interface we defined in our User model
import { IUser } from '../../models/User';

/**
 * This is a declaration merging file.
 * It extends the global Express namespace to add our custom 'user' property to the Request object.
 * This allows TypeScript to recognize `req.user` without errors in all authenticated routes.
 */

declare global {
  namespace Express {
    export interface Request {
      // The user property is optional (?) because not all requests will have it (only authenticated ones).
      // The type is set to IUser, ensuring that whenever we access req.user, TypeScript knows its shape.
      user?: IUser;
    }
  }
}
