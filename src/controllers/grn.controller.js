import prisma from "../config/prisma.js";

export const createGRN = async (req, res, next) => {
  try {
    const { supplierId, purchaseOrderId, items, remarks, isDirect } = req.body;

    const grn = await prisma.goodsReceipt.create({
      data: {
        supplierId,
        purchaseOrderId,
        items,
        remarks,
        isDirect: Boolean(isDirect)
      }
    });

    // FIFO BATCH + STOCK UPDATE
    for (const i of items) {
      const { inventoryItemId, qty, costPrice, expiry } = i;

      let stock = await prisma.stockItem.findUnique({
        where: { inventoryItemId }
      });

      if (!stock) {
        stock = await prisma.stockItem.create({
          data: { inventoryItemId, quantity: 0 }
        });
      }

      await prisma.stockItem.update({
        where: { id: stock.id },
        data: { quantity: stock.quantity + Number(qty) }
      });

      await prisma.inventoryBatch.create({
        data: {
          inventoryItemId,
          quantity: qty,
          costPrice,
          expiryDate: expiry || null,
          batchNumber: `B-${Date.now()}`
        }
      });

      await prisma.stockMovement.create({
        data: {
          stockItemId: stock.id,
          type: "PURCHASE",
          quantity: qty,
          reference: grn.id
        }
      });
    }

    res.status(201).json(grn);
  } catch (err) {
    next(err);
  }
};

export const listGRN = async (req, res, next) => {
  try {
    const list = await prisma.goodsReceipt.findMany({
      orderBy: { receivedDate: "desc" },
      include: { supplier: true }
    });

    res.json(list);
  } catch (err) {
    next(err);
  }
};

export const getGRN = async (req, res, next) => {
  try {
    const grn = await prisma.goodsReceipt.findUnique({
      where: { id: req.params.id },
      include: { supplier: true }
    });

    if (!grn) return res.status(404).json({ message: "GRN not found" });

    res.json(grn);
  } catch (err) {
    next(err);
  }
};
