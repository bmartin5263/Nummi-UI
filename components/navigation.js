import Link from 'next/link';
import ThemeContext from './themeContext';
import { useContext } from 'react';

function Navigation() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  return (
    <nav>
      <Link href="/" className="left logo">Nummi</Link>
      <Link href="/strategies" className='left link active-page'>Strategies</Link>
      <Link href="/trading" className='left link'>Trading</Link>
      <Link href="/bots" className='left link'>Bots</Link>
      <Link href="/simulations" className='left link'>Simulations</Link>
      <div id='toggle-dark-mode' className='right link-image-button' onClick={toggleDarkMode}>
        <img className='link-image' src="images/sun.png"/>
      </div>
      <Link href="/login" className='right link-button link-button-primary'>Login</Link>
      <Link href="/register" className='right link-button'>Register</Link>
    </nav>
  );
}

export default Navigation