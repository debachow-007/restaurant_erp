import prisma from "../config/prisma.js";

export const listTables = async (req, res, next) => {
  try {
    const tables = await prisma.table.findMany({
      orderBy: { name: "asc" }
    });
    res.json(tables);
  } catch (err) {
    next(err);
  }
};

export const createTable = async (req, res, next) => {
  try {
    const { name, capacity, metadata } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const table = await prisma.table.create({
      data: { name, capacity, metadata }
    });
    res.status(201).json(table);
  } catch (err) {
    next(err);
  }
};

export const updateTable = async (req, res, next) => {
  try {
    const table = await prisma.table.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(table);
  } catch (err) {
    next(err);
  }
};

export const updateTableStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const table = await prisma.table.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(table);
  } catch (err) {
    next(err);
  }
};
