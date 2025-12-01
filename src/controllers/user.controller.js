// src/controllers/user.controller.js
import prisma from '../config/prisma.js';

export const listUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, role, isActive } = req.body;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        phone,
        role,
        isActive
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true
      }
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
};
