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
import useInputForm from '../../hooks/useInputForm';
import Button, { ButtonType } from '../../components/button';
import nummiClient, { axiosClient } from '../../util/nummiClient';

function LoginPage({ csrfToken }) {
  const log = useLog('Login');
  const searchParams = useSearchParams(); 
  const error = searchParams.get('error');
  const [clicked, setClicked] = useState(false);
  let email = searchParams.get('email');
  if (email) {
    email = decodeURI(email);
  }

  const form = useInputForm({
    fields: [
      {
        name: "username",
        validator: (username) => {
          if (username == null || username == undefined || username == "") {
            return "Username or Email is required";
          }
        }
      },
      {
        name: "password",
        validator: (password) => {
          if (password == null || password == undefined || password == "") {
            return "Password is required";
          }
        }
      },
      {
        name: "retypedPassword"
      }
    ],
    // onSubmit: (req) => axiosClient.post("/api/auth/callback/credentials", req)
  })

  const bannerText = email != null 
    ? "Email successfully confirmed! Please try logging in" 
    : error != null ? error : null;
  return (
    <>
      <Head>
        <title>Login to Nummi</title>
      </Head>
      <article>
        <Banner bannerType={email == null ? BannerType.ERROR : BannerType.INFO} omnipresent>
          {bannerText}
        </Banner>
        <form className='form-box' method="post" action="/api/auth/callback/credentials">
          <h1>Login</h1>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <RowBreak height={".8em"}/>
          <TextField 
            field={form.getField("username")}
            placeholder="Username or Email" 
            title="Username or Email" 
            className={styles.textField} 
          />
          <RowBreak height={".6em"}/>
          <TextField 
            field={form.getField("password")}
            placeholder="Password" 
            title="Password" 
            type="password"
            className={styles.textField} 
          />
          <RowBreak height={"1.8em"}/>
          <Button id={styles.loginButton} type="submit" buttonType={ButtonType.PRIMARY} disabled={clicked} onClick={ e => {
            if (!form.validate()) {
              e.preventDefault();
              return e;
            }
            else {
              return e
            }
          }}>
            {clicked
              ? <span style={{marginLeft: '.5em'}} className='loader'></span>
              : <>{"Login"}</>
            }
          </Button>
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