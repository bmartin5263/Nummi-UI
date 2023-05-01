import Head from 'next/head';
import Layout from '../../components/layout';

import React from 'react'
import CenterBox from '../../components/centerBox';
import Banner from '../../components/banner';
import Link from 'next/link';

function LoginPage() {
  return (
    <>
      <Head>
        <title>Login to Nummi</title>
      </Head>
      <Banner className="banner-error" text="Uh Oh... We are experiencing technical difficulties"/>
      <CenterBox>
        <h1>Login</h1>
        {/* <span>hello</span> */}
        <label for="username"><input id="username" name="username" type="email" placeholder="Username or Email" /></label>
        {/* <span>hello</span> */}
        <label for="password"><input id="password" name="password" type="password" placeholder="Password" /></label>
        <button class="nummi-button-primary">Login</button>
        <div>
        <Link href="/register" className='center-box-link right'>Register</Link>
        </div>
      </CenterBox>
    </>
  );
}

export default LoginPage