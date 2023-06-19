import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_SOME_VARIABLE);
  return (
      <>
        <Head>
          <title>{siteTitle}</title>
        </Head>
      </>
  );
}