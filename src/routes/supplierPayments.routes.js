import { Router } from "express";
import {
  createSupplierPayment,
  listSupplierPayments
} from "../controllers/supplierPayments.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/", authMiddleware(["ADMIN", "MANAGER", "PURCHASE"]), listSupplierPayments);
router.post("/", authMiddleware(["ADMIN", "MANAGER", "PURCHASE"]), createSupplierPayment);

export default router;
