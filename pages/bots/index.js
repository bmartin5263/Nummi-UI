import Head from 'next/head';
import Layout from '../../components/layout';

import React from 'react'
import Banner from '../../components/banner';

function BotsPage() {
  return (
    <>
      <Head>
        <title>Bots</title>
      </Head>
      <Banner className="banner-error" text="Uh Oh... We are experiencing technical difficulties"/>
    </>
  );
}

export default BotsPage