// src/routes/auth.routes.js
import { Router } from 'express';
import { register, login, me } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.post('/register', register);      // For first admin, or later protected by ADMIN
router.post('/login', login);
router.get('/me', authMiddleware(), me);

export default router;
