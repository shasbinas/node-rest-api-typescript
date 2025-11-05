import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// ✅ Extend Express Request type to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        admin: boolean;
        iat?: number;
        exp?: number;
      };
    }
  }
}

// ✅ Middleware: Verify JWT token
export const verifyToken = (req: Request, res: Response, next: NextFunction): void | Response => {
  const authHeader = req.headers.authorization; // e.g. "Bearer <token>"

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & {
      id: string;
      name: string;
      admin: boolean;
    };

    req.user = decoded; // attach decoded info to request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// ✅ Middleware: Admin only access
export const verifyAdmin = (req: Request, res: Response, next: NextFunction): void | Response => {
  verifyToken(req, res, () => {
    if (req.user?.admin) {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
  });
};

// ✅ Middleware: Any authenticated user
export const verifyUser = (req: Request, res: Response, next: NextFunction): void | Response => {
  verifyToken(req, res, () => next());
};
