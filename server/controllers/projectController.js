import pool from "../config/db.js";
import {
  getAllProjects,
  createProject as createProjectModel,
} from "../models/projectModel.js";
import cloudinary from "../config/cloudinary.js";

// Upload a file buffer to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const isDocument = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(file.mimetype);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: isDocument ? "raw" : "image",
        folder: "henry-portfolio",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

// Delete a Cloudinary file using its URL
const deleteFromCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl || !fileUrl.includes("res.cloudinary.com")) {
      return;
    }

    const url = new URL(fileUrl);

    const parts = url.pathname.split("/");

    const uploadIndex = parts.indexOf("upload");

    if (uploadIndex === -1) {
      return;
    }

    let publicIdParts = parts.slice(uploadIndex + 1);

    // Remove version number such as v1234567890
    if (publicIdParts[0]?.startsWith("v")) {
      publicIdParts.shift();
    }

    let publicId = publicIdParts.join("/");

    const isRaw = url.pathname.includes("/raw/upload/");

    // Images don't include their extension in the public_id.
    // Raw files normally keep their extension.
    if (!isRaw) {
      publicId = publicId.replace(/\.[^/.]+$/, "");
    }

    await cloudinary.uploader.destroy(publicId, {
      resource_type: isRaw ? "raw" : "image",
      type: "upload",
    });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};

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

    let image = null;
    let document = null;

    // Upload image to Cloudinary
    if (req.files?.image?.[0]) {
      const imageResult = await uploadToCloudinary(
        req.files.image[0]
      );

      image = imageResult.secure_url;
    }

    // Upload document to Cloudinary
    if (req.files?.document?.[0]) {
      const documentResult = await uploadToCloudinary(
        req.files.document[0]
      );

      document = documentResult.secure_url;
    }

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
    console.error("Create project error:", error);

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

    // Delete image from Cloudinary
    if (image) {
      await deleteFromCloudinary(image);
    }

    // Delete document from Cloudinary
    if (document) {
      await deleteFromCloudinary(document);
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
      project: result.rows[0],
    });
  } catch (error) {
    console.error("Delete project error:", error);

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

    let newImage = null;
    let newDocument = null;

    // Upload new image
    if (req.files?.image?.[0]) {
      const imageResult = await uploadToCloudinary(
        req.files.image[0]
      );

      newImage = imageResult.secure_url;
    }

    // Upload new document
    if (req.files?.document?.[0]) {
      const documentResult = await uploadToCloudinary(
        req.files.document[0]
      );

      newDocument = documentResult.secure_url;
    }

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

    // Delete old image only if a new image replaced it
    if (newImage && oldImage) {
      await deleteFromCloudinary(oldImage);
    }

    // Delete old document only if a new document replaced it
    if (newDocument && oldDocument) {
      await deleteFromCloudinary(oldDocument);
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      project: result.rows[0],
    });
  } catch (error) {
    console.error("Update project error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};