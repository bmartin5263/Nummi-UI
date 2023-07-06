import Head from 'next/head';
import Banner, { BannerType } from '../components/banner';
import Button from '../components/button'
import { useState } from 'react';

export default function Test() {
  const [bannerType, setBannerType] = useState(BannerType.INFO);

  const clickButton = (e) => {
    e.preventDefault();
    
    if (bannerType == BannerType.INFO) {
      setBannerType(BannerType.ERROR);
    }
    else if (bannerType == BannerType.ERROR) {
      setBannerType(BannerType.WARN);
    }
    else if (bannerType == BannerType.WARN) {
      setBannerType(BannerType.SUCCESS);
    }
    else if (bannerType == BannerType.SUCCESS) {
      setBannerType(BannerType.INFO);
    }
  };

  return (
      <>
        <Head>
          <title>Resend Nummi Confirmation Email</title>
        </Head>
        <article>
          <Banner bannerType={bannerType} omnipresent>
            Hello
          </Banner>
          <Button onClick={clickButton}>Hello</Button>
        </article>
      </>
  );
}