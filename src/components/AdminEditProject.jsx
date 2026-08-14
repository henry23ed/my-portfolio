import { useState } from "react";

function AdminEditProject({ project, onCancel, onUpdated }) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [githubUrl, setGithubUrl] = useState(project.github_url || "");
  const [liveUrl, setLiveUrl] = useState(project.live_url || "");
  const [category, setCategory] = useState(project.category);
  const [featured, setFeatured] = useState(project.featured);

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
    formData.append("github_url", githubUrl);
    formData.append("live_url", liveUrl);
    formData.append("category", category);
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
        `${import.meta.env.VITE_API_URL}/api/projects/${project.id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Update response:", data);

      if (!response.ok) {
        if (data.errors) {
          setError(
            data.errors.map((error) => error.msg).join(", ")
          );
        } else {
          setError(
            data.message || "Failed to update project"
          );
        }

        return;
      }

      setMessage("Project updated successfully!");

      onUpdated(data.project);

    } catch (error) {
      console.error("Update failed:", error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Edit Project</h2>

      {message && <p>{message}</p>}

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />

        <input
          type="url"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="GitHub URL"
        />

        <input
          type="url"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          placeholder="Live URL"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setImage(null);
            setDocument(null);
            setDocumentImage(null);
          }}
          required
        >
          <option value="">Select Category</option>
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
              onChange={(e) =>
                setDocument(e.target.files[0])
              }
            />

            <label>Upload Document Screenshot</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setDocumentImage(e.target.files[0])
              }
            />
          </div>
        ) : (
          <div>
            <label>Upload Project Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Project"}
        </button>

        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AdminEditProject;