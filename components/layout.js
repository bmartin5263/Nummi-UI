import Head from 'next/head';
import Navigation from './navigation';
import { useState } from "react";
import ThemeContext from '../components/themeContext'

const name = 'Brandon';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children }) {
    const [darkMode, doSetDarkMode] = useState(false);
  
    const setDarkMode = (value) => {
      console.log("doSetDarkMode " + value);
      doSetDarkMode(value)
    }
    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <div className={darkMode ? "dark body" : "body"}>
                <div className="content">
                    <Head><link rel="icon" href="/favicon.ico" /></Head>
                    <Navigation />
                    <main>{children}</main>
                </div>
            </div>
        </ThemeContext.Provider>
    );
}