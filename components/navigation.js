import Link from 'next/link';
import ThemeContext from './themeContext';
import { useContext } from 'react';
import { useRouter } from 'next/router'
import styles from "styles/navigation.module.scss";

function Navigation() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <nav>
      <Link href="/" className={styles.logo}>Nummi</Link>
      {createLink("/strategies", "Strategies", router.pathname)}
      {createLink("/trading", "Trading", router.pathname)}
      {createLink("/bots", "Bots", router.pathname)}
      {createLink("/simulations", "Simulations", router.pathname)}
      <Link href="/login" id={styles.loginButton} className='button button-primary'>Login</Link>
      <Link href="/register" id={styles.registerButton} className='button'>Register</Link>
      <img id={styles.toggleDarkModeButton} className='button' onClick={toggleDarkMode} src={darkMode ? "images/sun2.png" : "images/moon2.png"}/>
    </nav>
  );
}

function createLink(path, name, currentPage) {
  var c = styles.link;
  if (currentPage == path) {
    c = c + " " + styles.activePage;
  }
  return <Link href={path} className={c}>{name}</Link>
}

export default Navigation