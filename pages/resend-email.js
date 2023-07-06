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
            hello
          </Banner>
          <form className='form-box'>
            <h1>Login</h1>
            <input name="csrfToken" type="hidden"/>
            <RowBreak height={".8em"}/>
            <TextField name="username" title="Username or Email"/>
            <RowBreak height={".6em"}/>
            <TextField name="password" title="Password" type="password"/>
            <RowBreak height={"1.8em"}/>
            <button type="submit" className="button button-primary">Login</button>
            <RowBreak height={"1.8em"}/>
            <RowBreak/>
          </form>
          <p>
            Hello
          </p>
        </article>
      </>
  );
}