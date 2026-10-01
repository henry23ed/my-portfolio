import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Services.css";

const services = [
  {
    number: "01",
    icon: "⌘",
    title: "Web Development",
    description:
      "Building responsive, user-friendly websites for businesses and individuals, with a focus on clean design and functionality.",
    features: [
      "Responsive Website Design",
      "React Web Applications",
      "Business Websites",
    ],
  },
  {
    number: "02",
    icon: "✳",
    title: "Graphic Design",
    description:
      "Creating visually appealing designs that help communicate ideas, strengthen brand identity, and capture attention.",
    features: [
      "Creative Visual Designs",
      "Promotional Graphics",
      "Digital Design",
    ],
  },
  {
    number: "03",
    icon: "✎",
    title: "Typing & Document Formatting",
    description:
      "Preparing clear, organized, and professionally formatted documents for personal, academic, and business use.",
    features: [
      "Document Typing",
      "Microsoft Word Formatting",
      "Document Layout",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section">
      <Container>
        <div className="services-heading">
          <span className="section-label">WHAT I OFFER</span>

          <h2>
            My <span>Services</span>
          </h2>

          <p>
            Practical digital and creative services to help bring your
            ideas to life.
          </p>
        </div>

        <Row className="g-4">
          {services.map((service) => (
            <Col lg={4} md={6} key={service.number}>
              <div className="service-card">
                <div className="service-card-top">
                  <span className="service-icon">
                    {service.icon}
                  </span>

                  <span className="service-number">
                    {service.number}
                  </span>
                </div>

                <h3>{service.title}</h3>

                <p className="service-description">
                  {service.description}
                </p>

                <ul className="service-features">
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <span className="service-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}