
import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import "./MovingCards.css";

const cards = [
  {
    title: "Frontend Developer",
    text: "Building modern, responsive, and user-friendly web experiences with React.",
  },
  {
    title: "Graphic Designer",
    text: "Turning ideas into creative visuals with thoughtful design.",
  },
  {
    title: "Professional Typist",
    text: "Delivering fast, accurate, and well-formatted typing services.",
  },
];

const typingPhrases = [
  "I build digital experiences",
  "I create responsive websites",
  "I bring ideas to life",
];

export default function MovingCards() {
  const [currentCard, setCurrentCard] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Typing animation states
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Moving cards animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);

      setTimeout(() => {
        setCurrentCard((prev) =>
          prev === cards.length - 1 ? 0 : prev + 1
        );

        setAnimating(false);
      }, 350);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

  const card = cards[currentCard];

  return (
    <section id="MovingCards" className="hero-section">
      <Container className="hero-container">
        <div className="hero-content text-center">
          <span className="hero-badge">
            Available for opportunities
          </span>

          <p className="hero-greeting">
            Hello, I'm
          </p>

          <h1 className="main-title">
            Henry Silas <span>Edet</span>
          </h1>

          <h2 className="hero-heading">
            {typedText}
            <span className="typing-cursor">|</span>
          </h2>

          <p className="subtitle">
            A creative developer growing into full-stack
            development, passionate about building useful,
            responsive, and engaging digital experiences.
          </p>

          <div className="hero-buttons">
            <Button
              variant="primary"
              className="explore-btn"
              href="#projects"
            >
              Explore My Work →
            </Button>

            <Button
              variant="outline-light"
              className="contact-btn"
              href="#contact"
            >
              Get In Touch
            </Button>
          </div>
        </div>

        <div className="moving-card-wrapper">
          <Card
            className={`moving-card ${
              animating ? "card-exit" : "card-enter"
            }`}
          >
            <Card.Body>
              <span className="card-label">
                WHAT I DO
              </span>

              <Card.Title>
                {card.title}
              </Card.Title>

              <Card.Text>
                {card.text}
              </Card.Text>

              <div className="card-indicators">
                {cards.map((_, index) => (
                  <span
                    key={index}
                    className={
                      index === currentCard
                        ? "indicator active"
                        : "indicator"
                    }
                  />
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
}