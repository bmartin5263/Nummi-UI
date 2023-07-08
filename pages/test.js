import Head from 'next/head';
import Banner, { BannerType } from '../components/banner';
import Button, { ButtonShape, ButtonType } from '../components/button'
import { useState } from 'react';

export default function Test() {
  const [bannerType, setBannerType] = useState(BannerType.INFO);
  const [enabled, setEnabled] = useState(true);

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
          <Button onClick={clickButton} disabled={!enabled} style={{width: '19em'}}>
            <span className="icon left material-icons">mail</span>
            Hello
            {!enabled && <span className='loader'></span>}
          </Button>
          <br></br>
          <Button onClick={clickButton} disabled={!enabled} buttonType={ButtonType.PRIMARY} shape={ButtonShape.IMAGE}>
            <span className="icon left material-icons">light_mode</span>
            {!enabled && <span className='loader'></span>}
          </Button>
          <br></br>
          <Button onClick={e => setEnabled(!enabled)}>
            {/* Toggle */}
          </Button>
          <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </article>
      </>
  );
}