// src/routes/user.routes.js
import { Router } from 'express';
import { listUsers, updateUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

// Only ADMIN should manage users
router.get('/', authMiddleware(['ADMIN']), listUsers);
router.patch('/:id', authMiddleware(['ADMIN']), updateUser);

export default router;
