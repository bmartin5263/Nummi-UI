import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.scss';
import Link from 'next/link';
import Navigation from './navigation';

const name = 'Brandon';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <Navigation/>
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← Back to home</Link>
                </div>
            )}
        </div>
    );
}