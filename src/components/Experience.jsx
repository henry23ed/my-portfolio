import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Experience.css";

const experiences = [
  {
    role: "Web Development Intern",
    type: "Professional Experience",
    description:
      "Gaining practical experience in web development while building my skills in frontend and backend technologies.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    role: "Freelance Typist",
    type: "Freelance",
    description:
      "Providing typing and document-formatting services, with a focus on clear, organized, and professional documents.",
    skills: ["Typing", "Microsoft Word", "Document Formatting"],
  },

  {
  role: "Graphic Designer",
  type: "Creative Experience",
  description:
    "Creating visual designs with a focus on creativity, clear communication, and appealing presentation.",
  skills: ["Graphic Design", "Visual Design", "Creativity"],
},
];

export default function Experience() {
  return (
  <section id="experience" className="experience-section">
    <Container>
      <div className="experience-heading">
        <span className="section-label">MY JOURNEY</span>

        <h2>
          Experience & <span>Growth</span>
        </h2>

        <p>
          My professional journey, practical experience, and the skills
          I'm developing along the way.
        </p>
      </div>

      <div className="experience-timeline">
        {experiences.map((item, index) => (
          <div
            className={`timeline-item ${
              index % 2 === 0 ? "timeline-left" : "timeline-right"
            }`}
            key={index}
          >
            <div className="timeline-dot">
              <span>{index + 1}</span>
            </div>

            <div className="experience-card">
              <div className="experience-card-top">
                <span className="experience-number">
                  0{index + 1}
                </span>

                <span className="experience-type">
                  {item.type}
                </span>
              </div>

              <h3>{item.role}</h3>

              <p className="experience-description">
                {item.description}
              </p>

              <div className="experience-skills">
                {item.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);}