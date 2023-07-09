import Head from 'next/head';
import RowBreak from '../components/rowBreak';
export default function PasswordEmailSent() {
  return (
      <>
        <Head>
          <title>Password Reset Email Sent</title>
        </Head>
        <article className='flex-wrapped' style={{justifyContent: 'center', alignItems: 'center'}}>
          <RowBreak height={"15em"}/>
          <h1 className="center-header">Password Reset Email Sent</h1>
          <RowBreak/>
          <h2 className='center-header2'>Check your Inbox</h2>
        </article>
      </>
  );
}