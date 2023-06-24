import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import nummiClient from '../util/nummiClient';

async function hello() {
  try {
    let loginResponse = await nummiClient.post('http://localhost:5045/login', {}, {
      auth: {
        username: "admin",
        password: "P@ssw0rd1!"
      }
    });
    console.log("login success");
    console.log(loginResponse.data);

    let anonResponse = await nummiClient.get("http://localhost:5045/dev/anon-strings")
    console.log("anon success");
    console.log(anonResponse.data);

    let response = await nummiClient.get("http://localhost:5045/dev/strings")
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