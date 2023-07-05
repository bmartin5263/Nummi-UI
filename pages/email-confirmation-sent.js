import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import RowBreak from '../components/rowBreak';
import nummiClient from '../util/nummiClient';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Banner from '../components/banner';

export default function EmailConfirmationSent() {
  const router = useRouter()
  const [clicked, setClicked] = useState(false);
  const [bannerError, setBannerError] = useState("");

  const handleResendEmail = async (event) => {
    event.preventDefault();
    setClicked(true);

    try {
      const url = "/resend-confirmation-email?email=" + router.query.email;
      await nummiClient.post(url, {});
    }
    catch (error) {
      setBannerError(error.response?.data?.userMessage ?? "Unable to resend confirmation email");
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
        <Banner className={(bannerError ? " banner-error" : " banner-disabled")}>
          {bannerError}
        </Banner>
        <div className='flex-wrapped' style={{justifyContent: 'center', gap: ".5em"}}>
          <RowBreak height={"14em"}></RowBreak>
          <h1 className="center-header">Confirmation Email Sent</h1>
          <RowBreak></RowBreak>
          <button className="button" onClick={handleResendEmail}>
            {clicked ? <span className='loader'></span> : "Resend Confirmation Email"}
          </button>
        </div>
      </>
  );
}