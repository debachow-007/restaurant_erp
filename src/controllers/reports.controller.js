import prisma from "../config/prisma.js";

// Sales by day
export const dailySales = async (req, res, next) => {
  try {
    const sales = await prisma.order.groupBy({
      by: ["createdAt"],
      _sum: { grandTotal: true }
    });

    res.json(sales);
  } catch (err) {
    next(err);
  }
};

// Best selling items
export const itemSalesReport = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany();
    const counts = {};

    for (const o of orders) {
      for (const i of o.items) {
        counts[i.name] = (counts[i.name] || 0) + i.qty;
      }
    }

    const result = Object.entries(counts)
      .map(([name, qty]) => ({ name, qty }))
      .sort((a, b) => b.qty - a.qty);

    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Payment summary
export const paymentSummary = async (req, res, next) => {
  try {
    const payments = await prisma.posPayment.groupBy({
      by: ["method"],
      _sum: { amount: true }
    });

    res.json(payments);
  } catch (err) {
    next(err);
  }
};

// Inventory usage summary
export const inventoryUsageReport = async (req, res, next) => {
  try {
    const usage = await prisma.stockMovement.groupBy({
      by: ["stockItemId"],
      _sum: { quantity: true }
    });

    res.json(usage);
  } catch (err) {
    next(err);
  }
};
