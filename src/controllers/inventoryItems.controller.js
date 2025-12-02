import prisma from "../config/prisma.js";

export const getInventoryItems = async (req, res, next) => {
  try {
    const items = await prisma.inventoryItem.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" }
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

export const getInventoryItem = async (req, res, next) => {
  try {
    const item = await prisma.inventoryItem.findUnique({
      where: { id: req.params.id }
    });

    if (!item || !item.isActive) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const createInventoryItem = async (req, res, next) => {
  try {
    const { name, sku, unit, minStockLevel, metadata } = req.body;

    if (!name || !unit) {
      return res.status(400).json({ message: "Name & unit are required" });
    }

    const item = await prisma.inventoryItem.create({
      data: { name, sku, unit, minStockLevel, metadata }
    });

    await prisma.stockItem.create({
      data: { inventoryItemId: item.id, quantity: 0 }
    });

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const updateInventoryItem = async (req, res, next) => {
  try {
    const item = await prisma.inventoryItem.update({
      where: { id: req.params.id },
      data: req.body
    });

    res.json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteInventoryItem = async (req, res, next) => {
  try {
    await prisma.inventoryItem.update({
      where: { id: req.params.id },
      data: { isActive: false }
    });

    res.json({ message: "Item deleted" });
  } catch (err) {
    next(err);
  }
};
