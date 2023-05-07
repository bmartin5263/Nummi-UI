import Link from 'next/link';
import ThemeContext from './themeContext';
import { useContext } from 'react';
import { useRouter } from 'next/router'

function Navigation() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  const router = useRouter();

  return (
    <nav>
      <Link href="/" className="logo">Nummi</Link>
      {createLink("/strategies", "Strategies", "", router.pathname)}
      {createLink("/trading", "Trading", "", router.pathname)}
      {createLink("/bots", "Bots", "", router.pathname)}
      {createLink("/simulations", "Simulations", "", router.pathname)}
      <Link href="/login" id="login-nav-button" className='button button-primary'>Login</Link>
      <Link href="/register" className='button'>Register</Link>
      <div id='toggle-dark-mode-button' className='button' onClick={toggleDarkMode}>
        <img id='toggle-dark-mode-img' src={darkMode ? "images/sun2.png" : "images/moon2.png"}/>
      </div>
    </nav>
  );
}

function createLink(path, name, baseClass, currentPage) {
  var c = baseClass + " link";
  if (currentPage == path) {
    c += " active-page"
  }
  return <Link href={path} className={c}>{name}</Link>
}

export default Navigation