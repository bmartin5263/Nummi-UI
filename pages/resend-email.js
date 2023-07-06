import Head from 'next/head';
import RowBreak from '../components/rowBreak';
import nummiClient from '../util/nummiClient';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Banner, { BannerType } from '../components/banner';
import TextField from '../components/textField';

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
          <title>Resend Nummi Confirmation Email</title>
        </Head>
        <article>
          <Banner bannerType={BannerType.ERROR} omnipresent>
          </Banner>
          <form className='form-box2'>
            <h1>Resend Confirmation Email</h1>
            <TextField name="email" title="Email" type="email"/>
            <RowBreak height={"1.8em"}/>
            <button type="submit" className="button button-primary">Resend Email</button>
            <RowBreak height={".6em"}/>
          </form>
        </article>
      </>
  );
}