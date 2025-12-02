import { Router } from "express";
import {
  previewBill,
  finalizeBill,
  addPosPayment
} from "../controllers/billing.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/orders/:orderId/preview", authMiddleware(["ADMIN","MANAGER","CASHIER"]), previewBill);
router.post("/orders/:orderId/finalize", authMiddleware(["ADMIN","MANAGER","CASHIER"]), finalizeBill);
router.post("/orders/:orderId/payments", authMiddleware(["ADMIN","MANAGER","CASHIER"]), addPosPayment);

export default router;
