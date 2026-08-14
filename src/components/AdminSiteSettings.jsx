import { useEffect, useState } from "react";

function AdminSiteSettings() {
  const [settings, setSettings] = useState({
    whatsapp: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    profile_image: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/settings`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load settings"
          );
        }

        setSettings(data.settings);
      } catch (error) {
        console.error("Failed to load settings:", error);
        setError("Failed to load site settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("whatsapp", settings.whatsapp || "");
      formData.append("email", settings.email || "");
      formData.append("phone", settings.phone || "");
      formData.append("location", settings.location || "");
      formData.append("github", settings.github || "");
      formData.append("linkedin", settings.linkedin || "");
      formData.append("instagram", settings.instagram || "");
      formData.append("facebook", settings.facebook || "");

      if (profileImage) {
        formData.append("profile_image", profileImage);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/settings`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Failed to update settings"
        );
        return;
      }

      setSettings(data.settings);
      setProfileImage(null);
      setMessage("Site settings updated successfully!");

    } catch (error) {
      console.error("Failed to update settings:", error);
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading site settings...</p>;
  }

  return (
    <div className="admin-site-settings">

      <h2>Site Settings</h2>

      <p>
        Update the contact, social, and profile information
        displayed on your public portfolio.
      </p>

      {message && (
        <p>{message}</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      <form onSubmit={handleSubmit}>

        <div>
          <label>Profile Picture</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProfileImage(e.target.files[0])
            }
          />

          {settings.profile_image && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${settings.profile_image}`}
                alt="Current profile"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
          )}
        </div>

        <input
          type="tel"
          name="whatsapp"
          value={settings.whatsapp || ""}
          onChange={handleChange}
          placeholder="WhatsApp number"
        />

        <input
          type="email"
          name="email"
          value={settings.email || ""}
          onChange={handleChange}
          placeholder="Email address"
        />

        <input
          type="tel"
          name="phone"
          value={settings.phone || ""}
          onChange={handleChange}
          placeholder="Phone number"
        />

        <input
          type="text"
          name="location"
          value={settings.location || ""}
          onChange={handleChange}
          placeholder="Location"
        />

        <input
          type="url"
          name="github"
          value={settings.github || ""}
          onChange={handleChange}
          placeholder="GitHub URL"
        />

        <input
          type="url"
          name="linkedin"
          value={settings.linkedin || ""}
          onChange={handleChange}
          placeholder="LinkedIn URL"
        />

        <input
          type="url"
          name="instagram"
          value={settings.instagram || ""}
          onChange={handleChange}
          placeholder="Instagram URL"
        />

        <input
          type="url"
          name="facebook"
          value={settings.facebook || ""}
          onChange={handleChange}
          placeholder="Facebook URL"
        />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </button>

      </form>

    </div>
  );
}

export default AdminSiteSettings;