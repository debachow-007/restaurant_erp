import prisma from "../config/prisma.js";

export const listCategories = async (req, res, next) => {
  try {
    const categories = await prisma.menuCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: { items: { where: { isActive: true } } }
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, sortOrder, metadata } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const cat = await prisma.menuCategory.create({
      data: { name, sortOrder: sortOrder ?? 0, metadata }
    });
    res.status(201).json(cat);
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const cat = await prisma.menuCategory.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(cat);
  } catch (err) {
    next(err);
  }
};

export const listMenuItems = async (req, res, next) => {
  try {
    const items = await prisma.menuItem.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      include: { category: true }
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const createMenuItem = async (req, res, next) => {
  try {
    const { name, description, basePrice, categoryId, isVeg, taxRate, metadata } = req.body;
    if (!name || !basePrice || !categoryId) {
      return res.status(400).json({ message: "name, basePrice, categoryId are required" });
    }

    const item = await prisma.menuItem.create({
      data: { name, description, basePrice, categoryId, isVeg, taxRate, metadata }
    });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateMenuItem = async (req, res, next) => {
  try {
    const item = await prisma.menuItem.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(item);
  } catch (err) {
    next(err);
  }
};
