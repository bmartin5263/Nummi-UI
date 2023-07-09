import Head from 'next/head';
import RowBreak from '../components/rowBreak';
import nummiClient from '../util/nummiClient';
import useLog from '../hooks/useLog';

export default function ConfirmEmail() {
  return (
      <>
        <Head>
          <title>Confirm Email</title>
        </Head>
        <div className='flex-wrapped' style={{justifyContent: 'center'}}>
          <div className='row-break-no-mobile'></div>
          <h1 className="center-header">Email Confirmed!</h1>
        </div>
      </>
  );
}

export async function getServerSideProps(context) {
  const query = context.query;
  const log = useLog("ConfirmEmailPage")

  try {
    var res = await nummiClient.post("confirm-email", {
      email: query.email,
      token: query.token
    })
    return {
      redirect: {
        destination: '/login?email=' + encodeURI(query.email) + "&message=" + encodeURI("Email successfully confirmed! Please try logging in"),
        permanent: false
      }
    }
  }
  catch (error) {
    log(error);
    return {
      redirect: {
          destination: '/bots',
          permanent: false
      }
    }
  }
}