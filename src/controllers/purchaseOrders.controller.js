import prisma from "../config/prisma.js";

export const createPurchaseOrder = async (req, res, next) => {
  try {
    const { supplierId, items, expectedDate, notes } = req.body;

    const po = await prisma.purchaseOrder.create({
      data: {
        supplierId,
        expectedDate,
        notes,
        items // JSON array of items [{ inventoryItemId, quantity, unitPrice }]
      }
    });

    res.status(201).json(po);
  } catch (err) {
    next(err);
  }
};

export const listPurchaseOrders = async (req, res, next) => {
  try {
    const list = await prisma.purchaseOrder.findMany({
      orderBy: { createdAt: "desc" },
      include: { supplier: true }
    });

    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const getPurchaseOrder = async (req, res, next) => {
  try {
    const po = await prisma.purchaseOrder.findUnique({
      where: { id: req.params.id },
      include: { supplier: true }
    });

    if (!po) return res.status(404).json({ message: "PO not found" });

    res.json(po);
  } catch (err) {
    next(err);
  }
};

export const updatePurchaseOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const po = await prisma.purchaseOrder.update({
      where: { id: req.params.id },
      data: { status }
    });

    res.json(po);
  } catch (err) {
    next(err);
  }
};
