import Head from 'next/head';
import Navigation from './navigation';
import { useContext } from "react";
import ThemeContext from '../components/themeContext'
import Banner from './banner';
import useLog from '../hooks/useLog';

export const siteTitle = 'Nummi';

export default function Layout({ children }) {
  const log = useLog("Layout");
  log("render layout");
  const theme = useContext(ThemeContext);
  return (
    <div className="content">
      <Head><link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💹</text></svg>"></link></Head>
      <Navigation />
      <main>{children}</main>
    </div>
  );
}