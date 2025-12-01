// src/middlewares/auth.js
import { verifyToken } from '../utils/jwt.js';

export function authMiddleware(requiredRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = verifyToken(token); // { userId, role }

      req.user = payload;

      if (requiredRoles.length) {
        if (!requiredRoles.includes(payload.role)) {
          return res.status(403).json({ message: 'Forbidden' });
        }
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
