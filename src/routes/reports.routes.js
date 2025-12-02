import { Router } from "express";
import {
  dailySales,
  itemSalesReport,
  paymentSummary,
  inventoryUsageReport
} from "../controllers/reports.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/sales/daily", authMiddleware(["ADMIN","MANAGER"]), dailySales);
router.get("/sales/items", authMiddleware(["ADMIN","MANAGER"]), itemSalesReport);
router.get("/sales/payments", authMiddleware(["ADMIN","MANAGER"]), paymentSummary);
router.get("/inventory/usage", authMiddleware(["ADMIN","MANAGER","STORE"]), inventoryUsageReport);

export default router;
