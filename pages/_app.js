import '../styles/globals.scss'
import React, { useEffect, useContext } from 'react';
import ThemeContext from '../components/themeContext'

export default function App({ Component, pageProps }) {
  const { darkMode } = useContext(ThemeContext);
  useEffect(() => {
    console.log("effect");
    console.log(darkMode);
    document.body.className = darkMode ? 'dark' : '';
  });       
  return <Component {...pageProps} />;
}