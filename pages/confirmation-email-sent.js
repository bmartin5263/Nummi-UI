import Head from 'next/head';
import RowBreak from '../components/rowBreak';
import nummiClient from '../util/nummiClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Banner, { BannerType } from '../components/banner';
import Button from '../components/button';
import useInputForm from '../hooks/useInputForm';
import useApiRequest from '../hooks/useApiRequest';
import Icon from '../components/icon';
import useSecondTimer from '../hooks/useSecondTimer';
import useLog from '../hooks/useLog';

const log = useLog("EmailConfirmationSent")

export default function EmailConfirmationSent() {
  const router = useRouter()
  const [bannerText, setBannerText] = useState("");
  const [bannerType, setBannerType] = useState(BannerType.ERROR);
  const timer = useSecondTimer(30);

  const resendEmail = useApiRequest({
    send: async (data) => await nummiClient.post("/resend-confirmation-email?email=" + router.query.email, {}),
    onSuccess: (res) => {
      setBannerType(BannerType.INFO);
      setBannerText("Confirmation Email Re-sent");
    },
    onFailure: (res) => {
      setBannerType(BannerType.ERROR);
      setBannerText(res.data?.userMessage ?? "Unable to resend confirmation email");
    }
  })
  log("render " + timer);
  return (
      <>
        <Head>
          <title>Confirmation Email Sent</title>
        </Head>
        <article className='flex-wrapped' style={{justifyContent: 'center', alignItems: 'center'}}>
          <Banner bannerType={bannerType} omnipresent>
            {bannerText}
          </Banner>
          <RowBreak height={"10em"}/>
          <h1 className="center-header">Confirmation Email Sent</h1>
          <RowBreak/>
          <h2 className='center-header2'>Check your Inbox</h2>
          <RowBreak height={"4em"}/>
          <Button className="button" onClick={resendEmail.send} style={{width: '18.7em'}} disabled={resendEmail.sent || timer > 0}>
            {resendEmail.sent ? <span className='loader'></span> : <><Icon name='email' style={{marginRight: '.3em'}}/>{"Resend Confirmation Email"}</>}
          </Button>
          <span style={{marginLeft: '2em', width: '2em'}}>
            {timer}
          </span>
        </article>
      </>
  );
}