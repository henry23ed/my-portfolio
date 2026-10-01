import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Offcanvas,
} from "react-bootstrap";
import "./MyNavbar.css";
import { useTheme } from "./ThemeContext.jsx";
export default function PortfolioNavbar({ setPage }) {
  const [showMenu, setShowMenu] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setNavbarVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

const handleNavClick = (sectionId) => {
  // Desktop
  if (window.innerWidth >= 992) {
    const section = document.getElementById(sectionId);

    if (section) {
      const navbarHeight = 70;

      const position =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });
    }

    return;
  }

  // Mobile
  setPendingSection(sectionId);
  setShowMenu(false);
};

  const handleMenuClosed = () => {
    if (!pendingSection) return;

    const sectionId = pendingSection;

    setPendingSection(null);

    requestAnimationFrame(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        const navbarHeight = 70;

        const position =
          section.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });
      }
    });
  };

  return (
    <Navbar
      expand="lg"
      className={`custom-navbar ${
        navbarVisible ? "navbar-visible" : "navbar-hidden"
      }`}
    >
      <Container>

        <Navbar.Brand
          className="logo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPage("home");
            setShowMenu(false);
            setPendingSection(null);

            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Henry Portfolio
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="portfolio-navbar-offcanvas"
          onClick={() => setShowMenu(true)}
        />

        <Navbar.Offcanvas
          id="portfolio-navbar-offcanvas"
          placement="end"
          show={showMenu}
          onHide={() => setShowMenu(false)}
          onExited={handleMenuClosed}
          restoreFocus={false}
          autoFocus={false}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              Henry Portfolio
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="mx-auto nav-links">

          <Nav.Link
              href="#MovingCards"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("MovingCards");
              }}
            >
              Home
            </Nav.Link>

            <Nav.Link
              href="#skills"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("skills");
              }}>
              Skills
            </Nav.Link>

             <Nav.Link
              href="#experience"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("experience");
              }}>
              Experience
            </Nav.Link>

            <Nav.Link
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("services");
              }}
            >
              Services
            </Nav.Link>

            <Nav.Link
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("projects");
              }}
            >
              Projects
            </Nav.Link>

            <Nav.Link
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("about");
              }}>
              About
            </Nav.Link>

            <Nav.Link
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
              }}
            >
              Contact
            </Nav.Link>

            

              <Nav.Link
  as="button"
  onClick={toggleTheme}
  className="theme-toggle"
  aria-label={`Switch to ${
    theme === "dark" ? "light" : "dark"
  } mode`}
>
  {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

      </Container>
    </Navbar>
  );
}