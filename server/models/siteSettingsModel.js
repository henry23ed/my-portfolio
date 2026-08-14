import pool from "../config/db.js";

export const getSiteSettings = async () => {
  const result = await pool.query(
    "SELECT * FROM site_settings WHERE id = 1"
  );

  return result.rows[0];
};

export const updateSiteSettings = async (settings) => {
  const {
    whatsapp,
    email,
    phone,
    location,
    github,
    linkedin,
    instagram,
    facebook,
    profile_image,
  } = settings;

  const result = await pool.query(
    `UPDATE site_settings
     SET whatsapp = $1,
         email = $2,
         phone = $3,
         location = $4,
         github = $5,
         linkedin = $6,
         instagram = $7,
         facebook = $8,
         profile_image = COALESCE($9, profile_image),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = 1
     RETURNING *`,
    [
      whatsapp,
      email,
      phone,
      location,
      github,
      linkedin,
      instagram,
      facebook,
      profile_image,
    ]
  );

  return result.rows[0];
};