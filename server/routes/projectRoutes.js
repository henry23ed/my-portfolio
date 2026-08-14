import express from "express";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createProjectValidator,
  updateProjectValidator,
} from "../validators/projectValidator.js";
import { validate } from "../middleware/validationMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

// Public
router.get("/", getProjects);

// Protected
router.post(
  "/",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  createProjectValidator,
  validate,
  createProject
);

router.delete("/:id", protect, deleteProject);

router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  updateProjectValidator,
  validate,
  updateProject
);

export default router;