import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./MyNavbar.css";

export default function PortfolioNavbar({ setPage }) {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => setPage("home")}
          className="logo"
        >
          Henry Portfolio
        </Navbar.Brand>

        <Navbar.Toggle
        aria-controls="basic-navbar-nav"/>

        <Navbar.Collapse>
          <Nav className="mx-auto nav-links">

            <Nav.Link href="#MovingCards">
              Home
            </Nav.Link>

            <Nav.Link href="#projects">
              Projects
            </Nav.Link>

            <Nav.Link href="#contact">
              Contact
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
