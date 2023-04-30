import { createContext } from "react";

const NavigationContext = createContext({
  darkMode: false,
  setDarkMode: (value) => {}
});

export default NavigationContext;