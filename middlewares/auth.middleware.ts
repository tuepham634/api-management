import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwt.helper';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Token không hợp lệ' });
      return;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
      return;
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Xác thực thất bại' });
  }
};
