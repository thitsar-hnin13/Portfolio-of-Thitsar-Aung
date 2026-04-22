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
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <DotBackground />
      <div className="content">
        <HomePage toggleTheme={toggleTheme} theme={theme} />
      </div>
    </>
  );
}

export default App;