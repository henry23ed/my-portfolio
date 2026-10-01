import React from "react";
import "./Marquee.css";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Bootstrap",
  "Node.js",
  "Express",
  "PostgreSQL",
  "REST APIs",
  "Git & GitHub",
];

export default function Marquee({ items = skills }) {
  return (
    <section className="marquee-section">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span className="marquee-item" key={index}>
            {item}
            <span className="marquee-star">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}