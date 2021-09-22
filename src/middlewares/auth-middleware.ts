import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/catch';
import jwt from 'jsonwebtoken';

export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { token } = req.headers;
    if (!token) {
      throw new Error('missing header token');
    }
    const JWT_SECRET = (): string => {
      if (process.env.JWT_SECRET) {
        return process.env.JWT_SECRET;
      } else {
        throw { code: 404, message: 'Invalid process jwt' };
      }
    };
    jwt.verify(token as string, JWT_SECRET());
    next();
  } catch (e) {
    sendError(res, e);
  }
};
