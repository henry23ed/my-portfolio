
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./About.css";

const typingPhrases = [
  "Building digital experiences",
  "with creativity and purpose.",
];

export default function About() {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];

    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && typedText === currentPhrase) {
      delay = 1500;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentPhrase) {
        setIsDeleting(true);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setPhraseIndex(
          (prev) => (prev + 1) % typingPhrases.length
        );
      } else {
        setTypedText((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : currentPhrase.slice(0, prev.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [typedText, phraseIndex, isDeleting]);

  return (
    <section id="about" className="about-section">
      <Container>
        <Row className="align-items-center g-5">

          {/* About Content */}
          <Col lg={7}>
            <span className="about-badge">
              ABOUT ME
            </span>

            <h2 className="about-title">
              {typedText}
            </h2>

            <p className="about-text">
              I'm Henry Silas Edet, a web developer,
              graphic designer, and professional typist
              based in Port Harcourt, Nigeria.
            </p>

            <p className="about-text">
              My web development journey started with
              HTML, CSS, and JavaScript. Since then,
              I've been expanding my skills with React,
              Node.js, Express, and PostgreSQL to build
              responsive websites and practical
              applications.
            </p>

            <p className="about-text">
              Beyond coding, my experience in graphic
              design and professional typing has
              strengthened my creativity, attention
              to detail, and communication skills.
              Through personal projects and internship
              experience, I'm continuously learning
              and improving.
            </p>

            <p className="about-text">
              My goal is to keep growing as a developer,
              work on meaningful projects, and help
              businesses and individuals establish
              a strong online presence.
            </p>
          </Col>

          {/* Skills Overview */}
          <Col lg={5}>
            <div className="about-info-card">
              <h3>What I Bring</h3>

              <div className="about-skill">
                <span className="skill-number">01</span>
                <div>
                  <h4>Web Development</h4>
                  <p>
                    Building responsive websites
                    and web applications.
                  </p>
                </div>
              </div>

              <div className="about-skill">
                <span className="skill-number">02</span>
                <div>
                  <h4>Graphic Design</h4>
                  <p>
                    Creating visual designs with
                    creativity and purpose.
                  </p>
                </div>
              </div>

              <div className="about-skill">
                <span className="skill-number">03</span>
                <div>
                  <h4>Professional Typing</h4>
                  <p>
                    Accurate typing and document
                    preparation.
                  </p>
                </div>
              </div>

              <div className="about-location">
                <span className="location-dot"></span>
                Port Harcourt, Nigeria
              </div>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}

