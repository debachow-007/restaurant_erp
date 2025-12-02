import { Router } from "express";
import {
  createPurchaseOrder,
  listPurchaseOrders,
  getPurchaseOrder,
  updatePurchaseOrderStatus
} from "../controllers/purchaseOrders.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/", authMiddleware(["ADMIN", "PURCHASE", "MANAGER"]), listPurchaseOrders);
router.get("/:id", authMiddleware(["ADMIN", "PURCHASE", "MANAGER"]), getPurchaseOrder);
router.post("/", authMiddleware(["ADMIN", "PURCHASE", "MANAGER"]), createPurchaseOrder);
router.patch("/:id/status", authMiddleware(["ADMIN", "MANAGER"]), updatePurchaseOrderStatus);

export default router;
