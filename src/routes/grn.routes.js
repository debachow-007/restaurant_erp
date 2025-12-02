import { Router } from "express";
import {
  createGRN,
  listGRN,
  getGRN
} from "../controllers/grn.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/", authMiddleware(["ADMIN", "STORE", "MANAGER", "PURCHASE"]), listGRN);
router.get("/:id", authMiddleware(["ADMIN", "STORE", "MANAGER", "PURCHASE"]), getGRN);
router.post("/", authMiddleware(["ADMIN", "STORE", "PURCHASE", "MANAGER"]), createGRN);

export default router;
