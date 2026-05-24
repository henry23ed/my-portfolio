import React, { useState } from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import "./Projects.css";

export default function Projects() {
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      title: "Brand Design",
      image: "public/Travel flyer 1.0.jpg",
    },
    {
      title: "Logo Collection",
      image: "public/TRAVEL FLYER 144.jpg",
    },
    {
      title: "Poster Design",
      image: "public/home decoration.jpg",
    },
    {
      title: "UI Mockup",
      image: "public/potographu123.png",
    },
  ];

  const openModal = (index) => {
    setCurrentIndex(index);
    setShow(true);
  };

  const closeModal = () => setShow(false);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = projects[currentIndex].image;
    link.download = projects[currentIndex].title;
    link.click();
  };

  return (
    <div id="projects" className="projects-page">
      <Container>
        <h1 className="projects-title text-center">My Projects</h1>
        <p className="text-center subtitle">
          Click any card to preview gallery
        </p>

        <Row className="g-4 mt-4">
          {projects.map((project, index) => (
            <Col md={6} lg={4} key={index}>
              <Card
                className="project-card"
                onClick={() => openModal(index)}
              >
                <div className="image-wrapper">
                  <Card.Img
                    src={project.image}
                    className="project-image"
                  />
                </div>

                <Card.Body>
                  <Card.Title>{project.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

 

<section className="mb-5">

  <h2 className="section-title text-center mb-4">
    Typing Services
  </h2>

  <Row className="g-4">

    {/* CARD 1 */}
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



    {/* CARD 2 */}
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



    {/* CARD 3 */}
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

</section>

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
            {projects[currentIndex]?.title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center modal-body-custom">
          <img
            src={projects[currentIndex]?.image}
            alt="preview"
            className="modal-image zoom-animation"
          />
        </Modal.Body>

        <Modal.Footer className="justify-content-between">
          <Button variant="secondary" onClick={prevImage}>
            ⬅ Prev
          </Button>

          <Button variant="success" onClick={downloadImage}>
            ⬇ Download
          </Button>

          <Button variant="secondary" onClick={nextImage}>
            Next ➡
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
