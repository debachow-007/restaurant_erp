import { Router } from "express";
import {
  listCategories,
  createCategory,
  updateCategory,
  listMenuItems,
  createMenuItem,
  updateMenuItem
} from "../controllers/menu.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

// Categories
router.get("/categories", authMiddleware(["ADMIN","MANAGER","WAITER","CASHIER"]), listCategories);
router.post("/categories", authMiddleware(["ADMIN","MANAGER"]), createCategory);
router.patch("/categories/:id", authMiddleware(["ADMIN","MANAGER"]), updateCategory);

// Items
router.get("/items", authMiddleware(["ADMIN","MANAGER","WAITER","CASHIER","KITCHEN"]), listMenuItems);
router.post("/items", authMiddleware(["ADMIN","MANAGER"]), createMenuItem);
router.patch("/items/:id", authMiddleware(["ADMIN","MANAGER"]), updateMenuItem);

export default router;
