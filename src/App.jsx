import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MyNavbar from "./components/MyNavbar";
import MovingCards from "./components/MovingCards";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import About from "./components/About";
import Admin from "./components/Admin";
import ParticleBackground from "./components/ParticleBackground";
import "./App.css"; // Import the CSS file for styling
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Services from "./components/Services";
import Marquee from "./components/Marquee"; // Import the Marquee component
function Home() {
  return (
    <>
      <ParticleBackground />

      <div className="homepage-content">
        <MyNavbar />
        <MovingCards />
        <Skills />
        <Marquee /> {/* Render the Marquee component */}
        <Experience />
        <Services />
        <Projects />
        <About />
        <Marquee
  items={[
    "Building Digital Experiences",
    "Creativity Meets Code",
    "Design • Develop • Create",
    "Turning Ideas Into Reality",
    "Helping Businesses Grow Online",
    "Your Vision • My Creation",
  ]}
/>
        <Contact />
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;