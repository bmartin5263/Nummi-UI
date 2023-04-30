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
      <Link href="/" className="left logo">Nummi</Link>
      {createLink("/strategies", "Strategies", "left", router.pathname)}
      {createLink("/trading", "Trading", "left", router.pathname)}
      {createLink("/bots", "Bots", "left", router.pathname)}
      {createLink("/simulations", "Simulations", "left", router.pathname)}
      <div id='toggle-dark-mode' className='right link-image-button' onClick={toggleDarkMode}>
        <img className='link-image' src={darkMode ? "images/sun.png" : "images/moon.png"}/>
      </div>
      <Link href="/login" className='right link-button link-button-primary'>Login</Link>
      <Link href="/register" className='right link-button'>Register</Link>
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