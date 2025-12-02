import { Router } from "express";
import {
  createOrder,
  listOrders,
  getOrder,
  updateOrderItems,
  updateOrderStatus
} from "../controllers/orders.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/", authMiddleware(["ADMIN","MANAGER","WAITER","CASHIER"]), listOrders);
router.get("/:id", authMiddleware(["ADMIN","MANAGER","WAITER","CASHIER","KITCHEN"]), getOrder);
router.post("/", authMiddleware(["ADMIN","MANAGER","WAITER","CASHIER"]), createOrder);
router.patch("/:id/items", authMiddleware(["ADMIN","MANAGER","WAITER","CASHIER"]), updateOrderItems);
router.patch("/:id/status", authMiddleware(["ADMIN","MANAGER","WAITER","CASHIER","KITCHEN"]), updateOrderStatus);

export default router;
