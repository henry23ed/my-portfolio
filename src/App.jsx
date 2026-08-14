import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MyNavbar from "./components/MyNavbar";
import MovingCards from "./components/MovingCards";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Admin from "./components/Admin";

function Home() {
  return (
    <>
      <MyNavbar />
      <MovingCards />
      <Projects />
      <Contact />
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