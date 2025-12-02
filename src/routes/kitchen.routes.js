import { Router } from "express";
import { listKOT, updateKOTStatus } from "../controllers/kitchen.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.get("/kot", authMiddleware(["KITCHEN","MANAGER","ADMIN"]), listKOT);
router.patch("/kot/:id/status", authMiddleware(["KITCHEN","MANAGER","ADMIN"]), updateKOTStatus);

export default router;
