import express from "express";
import {
  login,
  createAdmin,
  getMe,
  logout,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome Admin",
    admin: req.admin,
  });
});

router.get("/me", protect, getMe);
export default router;