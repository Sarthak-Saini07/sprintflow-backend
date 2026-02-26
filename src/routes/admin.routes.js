import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";
import {
  getAllUsers,
  getAdminStats,
  updateJobStatus,
  deleteUser
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/stats", protect, adminOnly, getAdminStats);
router.put("/job/:id/status", protect, adminOnly, updateJobStatus);
router.delete("/user/:id",protect,adminOnly,deleteUser);
export default router;