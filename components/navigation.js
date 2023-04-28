import styles from './navigation.module.scss'
import Link from 'next/link';

function Navigation() {
    return (
      <nav>
        <Link href="/" className={styles.logo}>Nummi</Link>
        <Link href="/strategies">Strategies</Link>
      </nav>
    );
  }
  
  export default Navigation