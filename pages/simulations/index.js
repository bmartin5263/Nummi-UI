import Head from 'next/head';
import Layout from '../../components/layout';

import React from 'react'
import Banner from '../../components/banner';

function SimulationsPage() {
  return (
    <>
      <Head>
        <title>Simulations</title>
      </Head>
      <Banner className="banner-info" text="Create an Account to Begin Trading!"/>
    </>
  );
}

export default SimulationsPage