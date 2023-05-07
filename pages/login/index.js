import Head from 'next/head';
import Layout from '../../components/layout';

import React, { useState } from 'react'
import CenterBox from '../../components/centerBox';
import Banner from '../../components/banner';
import Link from 'next/link';

function LoginPage() {
  const [isHidden, setIsHidden] = useState(true);

  const toggleIsHidden = () => {
    setIsHidden(!isHidden);
  }

  const hiddenTextClass = isHidden ? "hidden-text" : "hidden-text hidden-text-shown";

  return (
    <>
      <Head>
        <title>Login to Nummi</title>
      </Head>
      <Banner className="banner-error" text="Uh Oh... We are experiencing technical difficulties"/>
      <div className='center-box'>
        <h1 id="center-box-title">Login</h1>
        <div className='row-break'></div>
        <div className='grp'>
          <span className={hiddenTextClass}>Username</span>
          <span className={hiddenTextClass + " hidden-text-bad left-margin"}>Username is taken</span>
        </div>
        <input id="username" name="username" type="text" placeholder="Username or Email" />
        <div className='grp'>
          <span className={hiddenTextClass}>Password</span>
        </div>
        <input id="password" name="password" type="password" placeholder="Password" />
        <div className='row-break'></div>
        <button id="do-login-button" class="button button-primary" onClick={toggleIsHidden}>Login</button>
        <div className='row-break'></div>
        <div id="link-group">
          <Link href="/register" className='inline'>Register</Link>
          <Link href="/forgot-password" id='forgot-password' className='inline'>Forgot Password</Link>
        </div>
      </div>
    </>
  );
}

export default LoginPage