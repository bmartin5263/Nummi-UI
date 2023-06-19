import Head from 'next/head';
import Layout from '../../components/layout';
import styles from 'styles/register.module.scss'

import React, { useState } from 'react'
import TextField from '../../components/textField';
import RowBreak from '../../components/rowBreak';
import Link from 'next/link';
import Banner from '../../components/banner';

function RegisterPage() {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Banner className="banner-disabled"></Banner>
      <div id={styles.form} className='form-box'>
        <h1>Register</h1>
        <RowBreak height={".8em"}/>
          <TextField className={styles.textField} name="Email"/>
        <RowBreak height={".6em"}/>
          <TextField className={styles.textField} name="Username"/>
        <RowBreak height={".6em"}/>
          <TextField className={styles.textField} name="Password" type="password"/>
        <RowBreak height={".6em"}/>
          <TextField className={styles.textField} name="Retype Password" type="password"/>
        <RowBreak height={"1.8em"}/>
          <button 
            id={styles.loginButton} class="button button-primary"
            onClick={() => setClicked(!clicked)}
          >
            Create Account{clicked && <span className='loader'></span>}
          </button>
        <RowBreak height={"1.8em"}/>
          <div className={styles.linkGroup}>
            <Link href="/login" id={styles.registerButton} className='inline'>Login</Link>
          </div>
      </div>
    </>
  );
}

export default RegisterPage