import Head from 'next/head';
import RowBreak from '../components/rowBreak';
import nummiClient from '../util/nummiClient';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Banner, { BannerType } from '../components/banner';

export default function EmailConfirmationSent() {
  const router = useRouter()
  const [clicked, setClicked] = useState(false);
  const [bannerText, setBannerText] = useState("");
  const [bannerType, setBannerType] = useState(BannerType.ERROR);

  const handleResendEmail = async (event) => {
    event.preventDefault();
    setClicked(true);

    try {
      const url = "/resend-confirmation-email?email=" + router.query.email;
      await nummiClient.post(url, {});
      setBannerType(BannerType.INFO);
      setBannerText("Confirmation Email Re-sent");
    }
    catch (error) {
      setBannerType(BannerType.ERROR);
      setBannerText(error.response?.data?.userMessage ?? "Unable to resend confirmation email");
    }
    finally {
      setClicked(false);
    }
  }

  return (
      <>
        <Head>
          <title>Confirmation Email Sent</title>
        </Head>
        <Banner bannerType={bannerType} omnipresent>
          {bannerText}
        </Banner>
        <div className='flex-wrapped' style={{justifyContent: 'center'}}>
          <div className='row-break-no-mobile'></div>
          <h1 className="center-header">Confirmation Email Sent</h1>
          <RowBreak/>
          <h2 className='center-header2'>Check your inbox</h2>
          <RowBreak height={"4em"}/>
          <button className="button" onClick={handleResendEmail}>
            {clicked ? <span className='loader'></span> : "Resend Confirmation Email"}
          </button>
        </div>
      </>
  );
}