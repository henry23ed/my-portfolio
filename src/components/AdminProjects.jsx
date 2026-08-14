import { useEffect, useState } from "react";
import AdminEditProject from "./AdminEditProject";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`
      );

      const data = await response.json();

      if (response.ok) {
        setProjects(data.projects || data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setProjects((currentProjects) =>
          currentProjects.filter(
            (project) => project.id !== id
          )
        );
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (editingProject) {
    return (
      <AdminEditProject
        project={editingProject}
        onCancel={() => setEditingProject(null)}
        onUpdated={(updatedProject) => {
          setProjects((currentProjects) =>
            currentProjects.map((project) =>
              project.id === updatedProject.id
                ? updatedProject
                : project
            )
          );

          setEditingProject(null);
        }}
      />
    );
  }

  return (
    <div>
      <h2>My Projects</h2>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <p>
              Category: {project.category}
            </p>

            <p>
              Featured: {project.featured ? "Yes" : "No"}
            </p>

            {project.image && (
              <img
                src={`${import.meta.env.VITE_API_URL}/uploads/${project.image}`}
                alt={project.title}
                width="200"
              />
            )}

            <br />

            <button
              onClick={() => setEditingProject(project)}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(project.id)}
            >
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default AdminProjects;