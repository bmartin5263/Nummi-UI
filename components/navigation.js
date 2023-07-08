import Link from 'next/link';
import ThemeContext from './themeContext';
import { useContext } from 'react';
import { useRouter } from 'next/router'
import styles from "styles/navigation.module.scss";
import { signOut } from 'next-auth/react';
import useAuth from '../hooks/useAuth';
import useLog from '../hooks/useLog';

function Navigation() {
  const router = useRouter();
  const isAuthenticated = useAuth(false);
  const log = useLog("Navigation");

  return (
    <nav>
      {createLink("/strategies", "Strategies", router.pathname)}
      {isAuthenticated && createLink("/trading", "Trading", router.pathname)}
      {isAuthenticated && createLink("/bots", "Bots", router.pathname)}
      {isAuthenticated && createLink("/simulations", "Simulations", router.pathname)}
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