import Layout from '../components/layout';
import ThemeContext from '../components/themeContext';
import useLog from '../hooks/useLog';
import '../styles/globals.scss'
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react"
import RefreshTokenHandler from '../util/refreshTokenHandler';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const log = useLog("App");
  const [darkMode, setDarkMode] = useState(false);
  const [interval, setInterval] = useState(0);
  
  const toggleDarkMode = () => {
    log("Toggling Dark Mode");
    setDarkMode(!darkMode);
  };

  useEffect(() => { 
    log("Checking for Body Dark Mode");
    if (darkMode) {
      document.querySelector("body").classList.add("dark");
    }
    else {
      document.querySelector("body").classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <SessionProvider session={session} refetchInterval={interval}>
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <Layout>
          <Component {...pageProps} />
          <RefreshTokenHandler setInterval={setInterval} />
        </Layout>
      </ThemeContext.Provider>
    </SessionProvider>
  )
}