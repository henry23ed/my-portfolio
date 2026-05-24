// MovingCards.jsx
// React + React Bootstrap Portfolio Landing Page

import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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

  return (
    <div id='home' className="hero-section ">
      <Container className='mt-5'> 
        <div className="text-center hero-content">
          <h1 className="main-title ">My Portfolio</h1>
          <p className="subtitle">
            Creative Designer • Web Developer • Professional Typist
          </p>

          <Button variant="light" className="explore-btn">
            Explore My Work
          </Button>
        </div>

        <Row className="mt-5 g-4 justify-content-center">
          {cards.map((card, index) => (
            <Col md={4} key={index}>
              <Card className="moving-card">
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}


//export default MovingCards;
