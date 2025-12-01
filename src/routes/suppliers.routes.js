import { Router } from "express";
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../controllers/suppliers.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

// List all suppliers
router.get(
  "/",
  authMiddleware(["ADMIN", "PURCHASE", "MANAGER"]),
  getSuppliers
);

// Get one supplier
router.get(
  "/:id",
  authMiddleware(["ADMIN", "PURCHASE", "MANAGER"]),
  getSupplierById
);

// Create supplier
router.post(
  "/",
  authMiddleware(["ADMIN", "PURCHASE", "MANAGER"]),
  createSupplier
);

// Update supplier
router.patch(
  "/:id",
  authMiddleware(["ADMIN", "PURCHASE", "MANAGER"]),
  updateSupplier
);

// Delete supplier (soft delete)
router.delete(
  "/:id",
  authMiddleware(["ADMIN", "MANAGER"]),
  deleteSupplier
);

export default router;
