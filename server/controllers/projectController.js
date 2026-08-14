import pool from "../config/db.js";
import {
  getAllProjects,
  createProject as createProjectModel,
} from "../models/projectModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProjects = async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      github_url,
      live_url,
      category,
      featured,
    } = req.body;

    const image = req.files?.image
      ? req.files.image[0].filename
      : null;

    const document = req.files?.document
      ? req.files.document[0].filename
      : null;

    const project = await createProjectModel({
      title,
      description,
      image,
      document,
      github_url,
      live_url,
      category,
      featured,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProject = await pool.query(
      "SELECT * FROM projects WHERE id = $1",
      [id]
    );

    if (existingProject.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const project = existingProject.rows[0];

    const image = project.image;
    const document = project.document;

    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [id]
    );

    // Delete image
    if (image) {
      const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete document
    if (document) {
      const documentPath = path.join(
        __dirname,
        "..",
        "uploads",
        document
      );

      if (fs.existsSync(documentPath)) {
        fs.unlinkSync(documentPath);
      }
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
      project: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      github_url,
      live_url,
      category,
      featured,
    } = req.body;

    const existingProject = await pool.query(
      "SELECT * FROM projects WHERE id = $1",
      [id]
    );

    if (existingProject.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const oldProject = existingProject.rows[0];

    const oldImage = oldProject.image;
    const oldDocument = oldProject.document;

    const newImage = req.files?.image
      ? req.files.image[0].filename
      : null;

    const newDocument = req.files?.document
      ? req.files.document[0].filename
      : null;

    const result = await pool.query(
      `UPDATE projects
       SET title = $1,
           description = $2,
           github_url = $3,
           live_url = $4,
           category = $5,
           featured = $6,
           image = COALESCE($7, image),
           document = COALESCE($8, document)
       WHERE id = $9
       RETURNING *`,
      [
        title,
        description,
        github_url,
        live_url,
        category,
        featured,
        newImage,
        newDocument,
        id,
      ]
    );

    // Delete old image if a new image was uploaded
    if (newImage && oldImage) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        "uploads",
        oldImage
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Delete old document if a new document was uploaded
    if (newDocument && oldDocument) {
      const oldDocumentPath = path.join(
        __dirname,
        "..",
        "uploads",
        oldDocument
      );

      if (fs.existsSync(oldDocumentPath)) {
        fs.unlinkSync(oldDocumentPath);
      }
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      project: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};