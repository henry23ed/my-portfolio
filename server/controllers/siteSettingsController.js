import {
  getSiteSettings,
  updateSiteSettings,
} from "../models/siteSettingsModel.js";

export const getSettings = async (req, res) => {
  try {
    const settings = await getSiteSettings();

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Failed to get site settings:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load site settings",
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const {
      whatsapp,
      email,
      phone,
      location,
      github,
      linkedin,
      instagram,
      facebook,
    } = req.body;

    const profileImage = req.file
      ? req.file.filename
      : null;

    const settings = await updateSiteSettings({
      whatsapp,
      email,
      phone,
      location,
      github,
      linkedin,
      instagram,
      facebook,
      profile_image: profileImage,
    });

    res.status(200).json({
      success: true,
      message: "Site settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("Failed to update site settings:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update site settings",
    });
  }
};