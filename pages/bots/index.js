import Head from 'next/head';
import Layout from '../../components/layout';

import React from 'react'
import Banner, { BannerType } from '../../components/banner';

function BotsPage() {
  return (
    <>
      <Head>
        <title>Bots</title>
      </Head>
      <Banner bannerType={BannerType.ERROR}>
        Test Banner
      </Banner>
    </>
  );
}

export default BotsPage