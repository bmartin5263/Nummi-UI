import Head from 'next/head';
import Layout from '../../components/layout';

import React, { useState } from 'react'
import Banner, { BannerType } from '../../components/banner';
import Link from 'next/link';
import TextField from '../../components/textField';
import styles from 'styles/login.module.scss';
import RowBreak from '../../components/rowBreak';
import { getCsrfToken } from "next-auth/react"
import { useSearchParams } from 'next/navigation'
import useLog from '../../hooks/useLog';

function LoginPage({ csrfToken }) {
  const log = useLog('Login');
  const searchParams = useSearchParams(); 
  const error = searchParams.get('error');
  let email = searchParams.get('email');
  if (email) {
    email = decodeURI(email);
  }
  return (
    <>
      <Head>
        <title>Login to Nummi</title>
      </Head>
      <article>
        <Banner bannerType={BannerType.ERROR} omnipresent>
          {error}
        </Banner>
        <form id={styles.form} className='form-box' method="post" action="/api/auth/callback/credentials">
          <h1>Login</h1>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <RowBreak height={".8em"}/>
          <TextField className={styles.textField} name="username" title="Username or Email" initialValue={email}/>
          <RowBreak height={".6em"}/>
          <TextField className={styles.textField} name="password" title="Password" type="password"/>
          <RowBreak height={"1.8em"}/>
          <button id={styles.loginButton} type="submit" className="button button-primary">Login</button>
          <RowBreak height={"1.8em"}/>
          <div className={styles.linkGroup}>
            <Link href="/register" id={styles.registerButton} className='inline'>Create an Account</Link>
            <Link href="/forgot-password" id={styles.forgotPasswordButton} className='inline'>Forgot Password</Link>
          </div>
          <RowBreak/>
        </form>
      </article>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default LoginPage