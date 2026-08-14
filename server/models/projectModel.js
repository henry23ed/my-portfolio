import pool from "../config/db.js";

export const getAllProjects = async () => {
  const result = await pool.query(
    "SELECT * FROM projects ORDER BY created_at DESC"
  );

  return result.rows;
};

export const createProject = async (projectData) => {
  const {
    title,
    description,
    image,
    document,
    github_url,
    live_url,
    category,
    featured,
  } = projectData;

  const result = await pool.query(
    `INSERT INTO projects
      (title, description, image, document, github_url, live_url, category, featured)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      title,
      description,
      image,
      document,
      github_url,
      live_url,
      category,
      featured,
    ]
  );

  return result.rows[0];
};