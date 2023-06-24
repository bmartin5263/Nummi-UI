import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import nummiClient from '../util/nummiClient';

async function hello() {
  try {
    let loginResponse = await nummiClient.post('/login', {}, {
      auth: {
        username: "admin",
        password: "1538ad7A-4abE-4339-9ea6-e9baa0c14983-d62406fc-8582-4232-8829-A95b2422ef36"
      }
    });
    console.log("login success");
    console.log(loginResponse.data);

    let anonResponse = await nummiClient.get("/dev/anon-strings")
    console.log("anon success");
    console.log(anonResponse.data);

    let response = await nummiClient.get("/dev/strings")
    console.log("success");
    console.log(response.data);
  }
  catch (err) {
    console.log("error");
    console.log(err);
  }
}

export default function Home() {
  hello();
  return (
      <>
        <Head>
          <title>{siteTitle}</title>
        </Head>
      </>
  );
}