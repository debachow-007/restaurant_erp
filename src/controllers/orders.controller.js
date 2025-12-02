import prisma from "../config/prisma.js";
import { calculateOrderTotals } from "../utils/billing.js";
import { consumeStock } from "../services/inventory.service.js";

export const listOrders = async (req, res, next) => {
  try {
    const { status, type } = req.query;

    const where = {};
    if (status) where.status = status;
    if (type) where.orderType = type;

    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" }
    });

    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { bills: true, payments: true, table: true }
    });

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const {
      orderType,
      tableId,
      customerName,
      customerPhone,
      items,
      discountAmount = 0
    } = req.body;

    if (!orderType || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "orderType and items[] are required" });
    }

    const totals = calculateOrderTotals(items, {
      taxPercent: 0,              // plug config later
      serviceChargePercent: 0,
      discountAmount
    });

    const userId = req.user?.userId;

    const order = await prisma.order.create({
      data: {
        orderType,
        tableId: orderType === "DINE_IN" ? tableId : null,
        customerName,
        customerPhone,
        items,
        subTotal: totals.subTotal,
        taxAmount: totals.taxAmount,
        serviceCharge: totals.serviceCharge,
        discountAmount: totals.discountAmount,
        grandTotal: totals.grandTotal,
        createdById: userId
      }
    });

    // Make table occupied for dine-in
    if (orderType === "DINE_IN" && tableId) {
      await prisma.table.update({
        where: { id: tableId },
        data: { status: "OCCUPIED" }
      });
    }

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrderItems = async (req, res, next) => {
  try {
    const { items, discountAmount = 0 } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: "items[] required" });
    }

    const totals = calculateOrderTotals(items, {
      taxPercent: 0,
      serviceChargePercent: 0,
      discountAmount
    });

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: {
        items,
        subTotal: totals.subTotal,
        taxAmount: totals.taxAmount,
        serviceCharge: totals.serviceCharge,
        discountAmount: totals.discountAmount,
        grandTotal: totals.grandTotal
      }
    });

    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { items: true }
    });

    // Auto-create KOT when enters kitchen
    if (status === "IN_KITCHEN") {
      await prisma.kOT.create({
        data: { orderId, items: order.items }
      });
    }

    // When order is served (or closed), deduct raw materials
    if (status === "SERVED" || status === "CLOSED") {
      for (const i of order.items) {
        await consumeStock(i.menuItemId, i.qty, orderId);
      }
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};
