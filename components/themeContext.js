import { createContext } from "react";

const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: (value) => {}
});

export default ThemeContext;