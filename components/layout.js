import Head from 'next/head';
import Navigation from './navigation';
import { useContext } from "react";
import ThemeContext from '../components/themeContext'
import Banner from './banner';
import useLog from '../hooks/useLog';

export const siteTitle = 'Nummi';

export default function Layout({ children }) {
  // const log = useLog("Layout");
  // log("render layout");
  const theme = useContext(ThemeContext);
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bd579"></link>
        <meta name="apple-mobile-web-app-title" content="Nummi"></meta>
        <meta name="application-name" content="Nummi"></meta>
        <meta name="msapplication-TileColor" content="#00a300"></meta>
        <meta name="theme-color" content="#585858"></meta>
      </Head>
      <div className="content">
        <div className='flex-content'>
          <Navigation />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

