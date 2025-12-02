import prisma from "../config/prisma.js";

export const createSupplierPayment = async (req, res, next) => {
  try {
    const { supplierId, amount, method, reference, notes, metadata } = req.body;

    const pay = await prisma.supplierPayment.create({
      data: {
        supplierId,
        amount,
        method,
        reference,
        notes,
        metadata
      }
    });

    res.status(201).json(pay);
  } catch (err) {
    next(err);
  }
};

export const listSupplierPayments = async (req, res, next) => {
  try {
    const list = await prisma.supplierPayment.findMany({
      orderBy: { paidAt: "desc" },
      include: { supplier: true }
    });

    res.json(list);
  } catch (err) {
    next(err);
  }
};
