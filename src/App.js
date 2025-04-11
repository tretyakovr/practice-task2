import React, { useState } from "react";
import Todo from "./components/Todo";
import "./App.scss";

const Themes = {
  LIGHT: 'light',
  DARK: 'dark',
}


function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? Themes.DARK : Themes.LIGHT;
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className='App' data-theme={theme}>
      <Todo toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
