import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [activeCategory, setActiveCategory] = useState("All");

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  const openModal = (index) => {
    setCurrentIndex(index);
    setShow(true);
  };

  const closeModal = () => setShow(false);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === filteredProjects.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  const downloadImage = async () => {
  const project = filteredProjects[currentIndex];

  if (!project?.image) return;

  try {
    const imageUrl = `${import.meta.env.VITE_API_URL}/uploads/${project.image}`;

    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = project.title || "project-image";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Image download failed:", error);
  }
};

  const openDocument = (project) => {
    if (!project?.document) return;

    const documentUrl = `${import.meta.env.VITE_API_URL}/uploads/${project.document}`;

    window.open(documentUrl, "_blank", "noopener,noreferrer");
  };

  const downloadDocument = (project) => {
    if (!project?.document) return;

    const link = document.createElement("a");

    link.href = `${import.meta.env.VITE_API_URL}/uploads/${project.document}`;
    link.download = project.document;

    link.click();
  };

  const changeCategory = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
    setShow(false);
  };

  const currentProject = filteredProjects[currentIndex];

  return (
    <section id="projects" className="projects-section">
      <Container>

        <h2 className="projects-title">My Projects</h2>

        <p className="subtitle">
          Click any card to preview gallery
        </p>

        {/* CATEGORY FILTERS */}

        <div className="project-filters">

          <Button
            className={
              activeCategory === "All"
                ? "filter-active"
                : "filter-button"
            }
            onClick={() => changeCategory("All")}
          >
            All
          </Button>

          <Button
            className={
              activeCategory === "Web Development"
                ? "filter-active"
                : "filter-button"
            }
            onClick={() => changeCategory("Web Development")}
          >
            Web Development
          </Button>

          <Button
            className={
              activeCategory === "Graphic Design"
                ? "filter-active"
                : "filter-button"
            }
            onClick={() => changeCategory("Graphic Design")}
          >
            Graphic Design
          </Button>

          <Button
            className={
              activeCategory === "Documents"
                ? "filter-active"
                : "filter-button"
            }
            onClick={() => changeCategory("Documents")}
          >
            Documents
          </Button>

        </div>

        {/* PROJECTS */}

        {loading ? (
          <p>Loading projects...</p>
        ) : filteredProjects.length === 0 ? (
          <p>No projects available in this category.</p>
        ) : (
          <Row className="g-4 mt-4">

            {filteredProjects.map((project, index) => (
              <Col md={6} lg={4} key={project.id}>

                <Card
                  className="project-card"
                  onClick={() => openModal(index)}
                >

                  <div className="image-wrapper">

                    {project.image && (
                      <Card.Img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${project.image}`}
                        alt={project.title}
                        className="project-image"
                      />
                    )}

                  </div>

                  <Card.Body>

                    <Card.Title>
                      {project.title}
                    </Card.Title>

                    {project.featured && (
                      <span className="featured-badge">
                        Featured
                      </span>
                    )}

                    <p className="typing-text">
                      {project.description}
                    </p>

                    <small className="subtitle">
                      Category: {project.category}
                    </small>

                    <div className="mt-3">

                      {project.category === "Documents" ? (
                        <>
                          {project.document && (
                            <>
                              <Button
                                variant="success"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openDocument(project);
                                }}
                              >
                                View Document
                              </Button>

                              <Button
                                variant="secondary"
                                className="ms-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadDocument(project);
                                }}
                              >
                                Download
                              </Button>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {project.github_url && (
                            <Button
                              variant="dark"
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              GitHub
                            </Button>
                          )}

                          {project.live_url && (
                            <Button
                              variant="primary"
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ms-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Live Demo
                            </Button>
                          )}
                        </>
                      )}

                    </div>

                  </Card.Body>

                </Card>

              </Col>
            ))}

          </Row>
        )}

        {/* DOCUMENT / TYPING SERVICES */}

        <Row className="g-4 mt-5">

          <Col md={4}>
            <Card className="typing-card">
              <Card.Body>

                <h4 className="typing-title">
                  Fast Typing
                </h4>

                <p className="typing-text">
                  Accurate and fast typing services for documents,
                  assignments, reports, and manuscripts.
                </p>

              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="typing-card">
              <Card.Body>

                <h4 className="typing-title">
                  Document Formatting
                </h4>

                <p className="typing-text">
                  Clean and professional formatting for resumes,
                  business documents, and PDFs.
                </p>

              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="typing-card">
              <Card.Body>

                <h4 className="typing-title">
                  PDF Conversion
                </h4>

                <p className="typing-text">
                  Convert scanned files and PDFs into editable,
                  organized, and properly formatted documents.
                </p>

              </Card.Body>
            </Card>
          </Col>

        </Row>

      </Container>

      {/* GALLERY MODAL */}

      <Modal
        show={show}
        onHide={closeModal}
        centered
        size="lg"
        className="gallery-modal"
      >

        <Modal.Header closeButton>

          <Modal.Title>
            {currentProject?.title}
          </Modal.Title>

        </Modal.Header>

        <Modal.Body className="text-center modal-body-custom">

          {currentProject?.image && (
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${currentProject.image}`}
              alt={currentProject.title}
              className="modal-image zoom-animation"
            />
          )}

        </Modal.Body>

        <Modal.Footer className="gallery-modal-footer">

  <Button
    variant="secondary"
    onClick={prevImage}
  >
    ⬅ Prev
  </Button>

  {currentProject?.category === "Documents" ? (
    <div className="document-modal-actions">

      {currentProject?.document && (
        <>
          <Button
            variant="success"
            onClick={() => openDocument(currentProject)}
          >
            📄 View Document
          </Button>

          <Button
            variant="secondary"
            onClick={() => downloadDocument(currentProject)}
          >
            ⬇ Download Document
          </Button>
        </>
      )}

    </div>
  ) : (
    <Button
      variant="success"
      onClick={downloadImage}
    >
      ⬇ Download Image
    </Button>
  )}

  <Button
    variant="secondary"
    onClick={nextImage}
  >
    Next ➡
  </Button>

</Modal.Footer>
      </Modal>

    </section>
  );
}