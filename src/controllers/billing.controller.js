import prisma from "../config/prisma.js";
import { calculateOrderTotals } from "../utils/billing.js";

export const previewBill = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.orderId }
    });
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Here you could recalc or just return stored totals
    res.json({
      orderId: order.id,
      items: order.items,
      subTotal: order.subTotal,
      taxAmount: order.taxAmount,
      serviceCharge: order.serviceCharge,
      discountAmount: order.discountAmount,
      grandTotal: order.grandTotal
    });
  } catch (err) {
    next(err);
  }
};

export const finalizeBill = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.orderId }
    });
    if (!order) return res.status(404).json({ message: "Order not found" });

    const billNumber = `BILL-${Date.now()}`;

    const bill = await prisma.posBill.create({
      data: {
        orderId: order.id,
        billNumber,
        subTotal: order.subTotal,
        taxAmount: order.taxAmount,
        serviceCharge: order.serviceCharge,
        discountAmount: order.discountAmount,
        grandTotal: order.grandTotal
      }
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { status: "CLOSED", closedAt: new Date() }
    });

    res.status(201).json(bill);
  } catch (err) {
    next(err);
  }
};

export const addPosPayment = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { billId, amount, method, reference, metadata } = req.body;

    const payment = await prisma.posPayment.create({
      data: {
        orderId,
        billId,
        amount,
        method,
        reference,
        metadata
      }
    });

    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
};
