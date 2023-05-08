import Head from 'next/head';
import Layout from '../../components/layout';

import React, { useState } from 'react'
import Banner from '../../components/banner';
import Link from 'next/link';
import TextField from '../../components/textField';
import styles from 'styles/login.module.scss';

function RowBreak({height}) {
  return <div className='row-break' style={{'height': height}}/>;
}

function LoginPage() {
  return (
    <>
      <Head>
        <title>Login to Nummi</title>
      </Head>
      <div id={styles.form} className='form-box'>
        <h1>Login</h1>
        <RowBreak height={".8em"}/>
        <TextField className={styles.textField} name="Username or Email"/>
        <RowBreak height={".6em"}/>
        <TextField className={styles.textField} name="Password" warning="Password must contain at least 1 upper-case letter" type="password"/>
        <RowBreak height={"1.8em"}/>
        <button id={styles.loginButton} class="button button-primary">Login</button>
        <RowBreak height={"1.8em"}/>
        <div className={styles.linkGroup}>
          <Link href="/register" id={styles.registerButton} className='inline'>Register</Link>
          <Link href="/forgot-password" id={styles.forgotPasswordButton} className='inline'>Forgot Password</Link>
        </div>
        <RowBreak/>
      </div>
    </>
  );
}

export default LoginPage