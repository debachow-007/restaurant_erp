// src/utils/jwt.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export function signToken(payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d', ...options });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
