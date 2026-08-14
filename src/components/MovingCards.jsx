import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import "./MovingCards.css";

export default function MovingCards() {
  const cards = [
    {
      title: "Graphic Designer",
      text: "Bringing your ideas and dreams into reality through creative visuals.",
    },
    {
      title: "Web Developer",
      text: "Building modern, responsive, and user-friendly websites for everyone.",
    },
    {
      title: "Professional Typist",
      text: "Fast, accurate, and clean typing services with attention to detail.",
    },
  ];

  const [currentCard, setCurrentCard] = useState(0);
  const [animating, setAnimating] = useState(false);

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
  }, [cards.length]);

  const card = cards[currentCard];

  return (
    <div id="MovingCards" className="hero-section">
      <Container className="mt-5">

        <div className="text-center hero-content">

          <h1 className="main-title">
            My Portfolio
          </h1>

          <p className="subtitle">
            Creative Designer • Web Developer • Professional Typist
          </p>

          <Button
            variant="light"
            className="explore-btn"
            href="#projects"
          >
            Explore My Work
          </Button>

        </div>

        <div className="moving-card-wrapper">

          <Card
            className={`moving-card ${
              animating ? "card-exit" : "card-enter"
            }`}
          >
            <Card.Body>
              <Card.Title>
                {card.title}
              </Card.Title>

              <Card.Text>
                {card.text}
              </Card.Text>
            </Card.Body>
          </Card>

        </div>

      </Container>
    </div>
  );
}