
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Skills.css";

const skillGroups = [
  {
    title: "Frontend Development",
    description: "Creating responsive and interactive user interfaces.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"],
  },
  {
    title: "Backend & Database",
    description: "Building server-side applications and managing data.",
    skills: ["Node.js", "Express.js", "PostgreSQL", "REST APIs"],
  },
  {
    title: "Tools & Workflow",
    description: "Tools I use to build, manage, and test projects.",
    skills: ["Git", "GitHub", "VS Code", "DBeaver", "Thunder Client"],
  },
  {
    title: "Other Professional Skills",
    description: "Creative and practical skills beyond development.",
    skills: ["Graphic Design", "Professional Typing", "Document Formatting"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <Container>
        {/* Section Heading */}
        <div className="skills-heading">
          <span className="skills-badge">MY EXPERTISE</span>

          <h2 className="skills-title">
            Skills & <span>Technologies</span>
          </h2>

          <p className="skills-subtitle">
            The tools, technologies, and professional skills
            I use to turn ideas into practical digital
            experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <Row className="g-4">
          {skillGroups.map((group, index) => (
            <Col md={6} key={group.title}>
              <div className="skill-card">
                <span className="skill-card-number">
                  0{index + 1}
                </span>

                <h3>{group.title}</h3>

                <p className="skill-card-description">
                  {group.description}
                </p>

                <div className="skill-tags">
                  {group.skills.map((skill) => (
                    <span className="skill-tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}