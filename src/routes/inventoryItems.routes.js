import { Router } from "express";
import {
  createInventoryItem,
  getInventoryItems,
  getInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} from "../controllers/inventoryItems.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/", authMiddleware(["ADMIN", "STORE", "MANAGER"]), getInventoryItems);
router.get("/:id", authMiddleware(["ADMIN", "STORE", "MANAGER"]), getInventoryItem);
router.post("/", authMiddleware(["ADMIN", "MANAGER"]), createInventoryItem);
router.patch("/:id", authMiddleware(["ADMIN", "MANAGER"]), updateInventoryItem);
router.delete("/:id", authMiddleware(["ADMIN", "MANAGER"]), deleteInventoryItem);

export default router;
