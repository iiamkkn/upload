import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Checks if user is authenticated or not
export const isAuthenticatedUser = expressAsyncHandler(
  async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
      return next(
        new ErrorHandler('Login first to access this resource.', 401)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    next();
  }
);

// Handling users roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }
    next();
  };
};
