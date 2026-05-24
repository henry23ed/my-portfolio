import React, { useState } from "react";
import MyNavbar from "./components/MyNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import MovingCards from "./components/MovingCards";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
function App() {
  const [page, setPage] = useState("home")
  return (
    <>
      <MyNavbar />

      <MovingCards />
      
      <Projects />

      <Contact />
    </>
  );
}

export default App;
