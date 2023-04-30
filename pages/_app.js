import Layout from '../components/layout';
import ThemeContext from '../components/themeContext';
import '../styles/globals.scss'
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContext.Provider>
  )
}