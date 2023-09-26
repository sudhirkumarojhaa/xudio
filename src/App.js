import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FiMoon, FiSun } from "react-icons/fi";
import TopicList from "./components/TopicList";

function App() {
  // Initialize the theme based on local storage or default to light theme
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Update the theme in local storage when it changes
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Apply the theme class to the app container
  const themeClass = isDarkTheme ? "dark-theme" : "light-theme";

  // Add an effect to listen for changes in the theme
  useEffect(() => {
    // Add or remove the theme class from the body element
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(themeClass);
  }, [themeClass]);

  return (
    <div className={`app-container ${themeClass} vh-100 p-5`}>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Go Beyond</h1>
        <div className="my-4" onClick={toggleTheme}>
          {isDarkTheme ? (
            <FiSun size={24} color={"orange"} />
          ) : (
            <FiMoon size={24} color={"blue"} />
          )}
        </div>
      </div>
      <h5>
        Empower Your Mind: Explore, Learn, and Achieve More with Go Beyond.
      </h5>
      <hr />
      <TopicList />
    </div>
  );
}

export default App;
