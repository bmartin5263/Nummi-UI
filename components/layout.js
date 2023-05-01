import Head from 'next/head';
import Navigation from './navigation';
import { useContext } from "react";
import ThemeContext from '../components/themeContext'
import Banner from './banner';

const name = 'Brandon';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children }) {
  console.log("render layout")
  const theme = useContext(ThemeContext);
  return (
    <div className={theme.darkMode ? "dark body" : "body"}>
      <div className="content">
        <Head><link rel="icon" href="/favicon.ico" /></Head>
        <Navigation />
        <main>{children}</main>
      </div>
    </div>
  );
}