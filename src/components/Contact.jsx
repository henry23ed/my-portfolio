import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "./Contact.css";

export default function Contact() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/settings`
        );

        const data = await response.json();

        if (response.ok) {
          setSettings(data.settings);
        }
      } catch (error) {
        console.error("Failed to fetch contact settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div id="contact" className="contact-section">
        <Container>
          <p className="text-center">Loading contact information...</p>
        </Container>
      </div>
    );
  }

  return (
    <div id="contact" className="contact-section">
      <Container>

        <h1 className="contact-title text-center">
          Contact Me
        </h1>

        <p className="contact-subtitle text-center">
          Let’s work together and bring your ideas to life.
        </p>

        <Row className="align-items-center mt-5">

          {/* IMAGE SIDE */}
          <Col lg={5} className="mb-4">

            <Card className="profile-card">

             <img
              src={
                settings?.profile_image
                  ? `${import.meta.env.VITE_API_URL}/uploads/${settings.profile_image}`
                  : "/1f6e6227-fe42-42e7-90ba-bf96fea47057_128.jpeg"
              }
              alt="Henry's Profile picture"
              className="profile-image"
            />

              <Card.Body>
                <h3>Henry Silas</h3>

                <p>
                  Graphic Designer • Web Developer • Professional Typist
                </p>

                {settings?.location && (
                  <p>
                    📍 {settings.location}
                  </p>
                )}
              </Card.Body>

            </Card>

          </Col>

          {/* CONTACT SIDE */}
          <Col lg={7}>

            <div className="contact-form">

              <h3 className="mb-4">
                Get In Touch
              </h3>

              {settings?.whatsapp && (
                <p>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(
                      /\D/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {settings.whatsapp}
                  </a>
                </p>
              )}

              {settings?.email && (
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${settings.email}`}>
                    {settings.email}
                  </a>
                </p>
              )}

              {settings?.phone && (
                <p>
                  <strong>Phone:</strong>{" "}
                  <a href={`tel:${settings.phone}`}>
                    {settings.phone}
                  </a>
                </p>
              )}

              <div className="contact-social-links">

                {settings?.github && (
                  <a
                    href={settings.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}

                {settings?.linkedin && (
                  <a
                    href={settings.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                )}

                {settings?.instagram && (
                  <a
                    href={settings.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                )}

                {settings?.facebook && (
                  <a
                    href={settings.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                )}

              </div>

              <hr />

              <Form>

                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    type="email"
                    placeholder="Your Email"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Your Message"
                  />
                </Form.Group>

                <Button className="send-btn">
                  Send Message
                </Button>

              </Form>

            </div>

          </Col>

        </Row>

      </Container>
    </div>
  );
}