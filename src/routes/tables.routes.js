import { Router } from "express";
import {
  listTables,
  createTable,
  updateTable,
  updateTableStatus
} from "../controllers/tables.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/", authMiddleware(["ADMIN","MANAGER","WAITER","CASHIER"]), listTables);
router.post("/", authMiddleware(["ADMIN","MANAGER"]), createTable);
router.patch("/:id", authMiddleware(["ADMIN","MANAGER"]), updateTable);
router.patch("/:id/status", authMiddleware(["ADMIN","MANAGER"]), updateTableStatus);

export default router;
