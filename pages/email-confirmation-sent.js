import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import RowBreak from '../components/rowBreak';
import nummiClient from '../util/nummiClient';

export default function EmailConfirmationSent() {
  return (
      <>
        <Head>
          <title>Email Confirmation Sent</title>
        </Head>
        <div className='flex-wrapped' style={{justifyContent: 'center'}}>
          <RowBreak height={"15em"}></RowBreak>
          <h1 className="center-header">Check Your Inbox</h1>
        </div>
      </>
  );
}