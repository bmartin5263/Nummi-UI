import App from "next/app"
import Layout from '../components/layout';
import ThemeContext from '../components/themeContext';
import useLog from '../hooks/useLog';
import '../styles/globals.scss'
import { useEffect, useState } from "react";
import { SessionProvider, getSession } from "next-auth/react"
import RefreshTokenHandler from '../util/refreshTokenHandler';
import { cookies } from "next/headers";

export default function NummiApp({ Component, theme, pageProps: { session, ...pageProps } }) {
  const log = useLog("App");
  
  const [darkMode, setDarkMode] = useState(theme == "dark");
  const [interval, setInterval] = useState(0);
  
  const toggleDarkMode = () => {
    log("Toggling Dark Mode");
    setDarkMode(!darkMode);
  };

  // if (theme == "dark" && !darkMode) {
  //   setDarkMode(true);
  // }
  // else if (theme == "light" && darkMode) {
  //   setDarkMode(false);
  // }

  // useEffect(() => { 
  //   log("Checking for Body Dark Mode");
  //   const theme = window.localStorage.getItem("theme");
  //   if (theme == "dark") {
  //     setDarkMode(true);
  //   }
  //   else if (theme == "light") {
  //     setDarkMode(false);
  //   }
  //   setReady(true);
  // }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    if (darkMode && !body.classList.contains("dark")) {
      body.classList.add("dark");
      document.cookie = 'Theme=dark; expires=Sun, 1 Jan 2024 00:00:00 UTC; path=/'
    }
    else if (!darkMode && body.classList.contains("dark")) {
      body.classList.remove("dark");
      document.cookie = 'Theme=light; expires=Sun, 1 Jan 2024 00:00:00 UTC; path=/'
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
};

NummiApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context)
  const session = await getSession(context)
  const token = context?.ctx?.req?.cookies["X-Access-Token"];
  const theme = context?.ctx?.req?.cookies["Theme"];

  // const cookieList = cookies();

  const x = {
    ...appProps,
    session,
    theme: theme
  };

  return x;
}
