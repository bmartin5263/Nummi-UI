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
      <div className='nav-section-left'>
        <Link href="/" className="logo">Nummi</Link>
      </div>
      <div className='nav-section-left'>
        <Link href="/strategies" className='active-page'>Strategies</Link>
        <Link href="/trading">Trading</Link>
        <Link href="/bots">Bots</Link>
        <Link href="/simulations">Simulations</Link>
        <button onClick={toggleDarkMode}>Hello</button>
      </div>
      <div className='nav-section-right'>
        <Link href="/strategies">Strategies</Link>
      </div>
    </nav>
  );
}

export default Navigation