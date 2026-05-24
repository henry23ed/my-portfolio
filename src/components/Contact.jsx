// Contact.jsx

import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "./Contact.css";

export default function Contact() {
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

              {/* PUT YOUR IMAGE HERE */}
              <img
                src="public/1f6e6227-fe42-42e7-90ba-bf96fea47057_128.jpeg"
                alt="Henry's Profile picture"
                className="profile-image"
              />

              <Card.Body>
                <h3>Henry Silas</h3>

                <p>
                  Graphic Designer • Web Developer • Professional Typist
                </p>
              </Card.Body>

            </Card>

          </Col>

          {/* CONTACT FORM */}
          <Col lg={7}>

            <Form className="contact-form">

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

          </Col>

        </Row>

      </Container>
    </div>
  );
}
