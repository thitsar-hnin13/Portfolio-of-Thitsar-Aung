<<<<<<< HEAD
import React, { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";
import ThitsarAungBot from "./sections/ThitsarAungBot";

const App = () => {
  const [introDone, setIntroDone] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (introDone && audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => {});
=======
import React, { useEffect, useState } from "react";
import HomePage from "./pages/Home";
import DotBackground from "./components/DotBackground";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
>>>>>>> 5da8b48b2bb7568493a265824a3ba3edb4e8acf2
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
<<<<<<< HEAD
      {/* Voice */}
      <audio ref={audioRef} src="/" autoPlay muted preload="auto" />

      {!introDone && <IntroAnimation onFinished={() => setIntroDone(true)} />}

      {introDone && (
        <div className="relative gradient text-blue-400 ">
          <CustomCursor />

          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Testimonials />
          <Contact />
          <Footer />
          <ThitsarAungBot />
        </div>
      )}
    </>
  );
};

export default App;
=======
      <DotBackground />
      <div className="content">
        <HomePage toggleTheme={toggleTheme} theme={theme} />
      </div>
    </>
  );
}

export default App;
>>>>>>> 5da8b48b2bb7568493a265824a3ba3edb4e8acf2
