import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/siteSettingsController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

// Public
router.get("/", getSettings);

// Admin only
router.put(
  "/",
  protect,
  upload.single("profile_image"),
  updateSettings
);

export default router;