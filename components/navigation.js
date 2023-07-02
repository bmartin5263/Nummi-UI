import Link from 'next/link';
import ThemeContext from './themeContext';
import { useContext } from 'react';
import { useRouter } from 'next/router'
import styles from "styles/navigation.module.scss";
import { signOut } from 'next-auth/react';
import useAuth from '../hooks/useAuth';
import useLog from '../hooks/useLog';

function Navigation() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const router = useRouter();
  const isAuthenticated = useAuth(false);
  const log = useLog("Navigation");
  log(isAuthenticated);

  return (
    <nav>
      <Link href="/" className={styles.logo}>Nummi</Link>
      {createLink("/strategies", "Strategies", router.pathname)}
      {isAuthenticated && createLink("/trading", "Trading", router.pathname)}
      {isAuthenticated && createLink("/bots", "Bots", router.pathname)}
      {isAuthenticated && createLink("/simulations", "Simulations", router.pathname)}
      {!isAuthenticated && <Link href="/login" id={styles.loginButton} className='button button-primary'>Login</Link>}
      {isAuthenticated && <button className='button' id={styles.signOutButton} onClick={() => signOut()}>Sign Out</button>}
      {!isAuthenticated && <Link href="/register" id={styles.registerButton} className='button'>Register</Link>}
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