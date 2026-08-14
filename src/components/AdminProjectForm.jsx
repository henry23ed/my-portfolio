import { useState } from "react";

function AdminProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [featured, setFeatured] = useState(false);

  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);
  const [documentImage, setDocumentImage] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("github_url", githubUrl);
    formData.append("live_url", liveUrl);
    formData.append("featured", featured);

    if (category === "Documents") {
      if (document) {
        formData.append("document", document);
      }

      if (documentImage) {
        formData.append("image", documentImage);
      }
    } else {
      if (image) {
        formData.append("image", image);
      }
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create project");
        return;
      }

      setMessage("Project added successfully!");

      setTitle("");
      setDescription("");
      setCategory("");
      setGithubUrl("");
      setLiveUrl("");
      setFeatured(false);
      setImage(null);
      setDocument(null);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-project-form">

      <h2>Add New Project</h2>

      {message && (
        <p>{message}</p>
      )}

      {error && (
        <p>{error}</p>
      )}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setImage(null);
            setDocument(null);
          }}
          required
        >
          <option value="">Select category</option>
          <option value="Web Development">
            Web Development
          </option>
          <option value="Graphic Design">
            Graphic Design
          </option>
          <option value="Documents">
            Documents
          </option>
        </select>

        <input
          type="url"
          placeholder="GitHub URL (optional)"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />

        <input
          type="url"
          placeholder="Live Demo URL (optional)"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured
        </label>
        
        {category === "Documents" ? (
          <div>
            <label>Upload Document</label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setDocument(e.target.files[0])}
              required
            />

            <label>Upload Document Screenshot</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setDocumentImage(e.target.files[0])}
              required
            />
          </div>
        ) : (
          <div>
            <label>Upload Project Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Adding Project..." : "Add Project"}
        </button>

      </form>

    </div>
  );
}

export default AdminProjectForm;