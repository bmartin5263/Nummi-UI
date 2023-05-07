import Head from 'next/head';
import Navigation from './navigation';
import { useContext } from "react";
import ThemeContext from '../components/themeContext'
import Banner from './banner';
import useLog from '../hooks/useLog';

const name = 'Brandon';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children }) {
  const log = useLog("Layout");
  log("render layout");
  const theme = useContext(ThemeContext);
  return (
    <div className="content">
      <Head><link rel="icon" href="/favicon.ico" /></Head>
      <Navigation />
      <main>{children}</main>
    </div>
  );
}