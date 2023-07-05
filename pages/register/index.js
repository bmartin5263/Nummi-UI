import Head from 'next/head';
import Layout from '../../components/layout';
import styles from 'styles/register.module.scss'

import React, { useState } from 'react'
import TextField from '../../components/textField';
import RowBreak from '../../components/rowBreak';
import Link from 'next/link';
import Banner from '../../components/banner';
import nummiClient from '../../util/nummiClient';
import { useRouter } from 'next/router';

function RegisterPage() {
  const [clicked, setClicked] = useState(false);
  const [bannerError, setBannerError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [retypedPasswordError, setRetypedPasswordError] = useState("");
  const router = useRouter()

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    const username = event.target.username?.value ?? "";
    const email = event.target.email?.value ?? "";
    const password = event.target.password?.value ?? "";
    const retypedPassword = event.target.retypedPassword?.value ?? "";

    setClicked(true);
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
    setBannerError("");
    setRetypedPasswordError("");

    let failed = false;
    if (email == null || email == undefined || email == "") {
      setEmailError("Email is required");
      failed = true;
    }
    else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Invalid Email Address");
      failed = true;
    }

    if (username == null || username == undefined || username == "") {
      setUsernameError("Username is required");
      failed = true;
    }
    else if (username.length > 20) {
      setUsernameError("Username cannot be more than 20 characters");
      failed = true;
    }

    if (password == null || password == undefined || password == "") {
      setPasswordError("Password is required");
      failed = true;
    }
    else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      failed = true;
    }
    
    if (password !== retypedPassword) {
      setRetypedPasswordError("Passwords do not match");
      failed = true;
    }

    if (failed) {
      setClicked(false);
      return;
    }
 
    // Get data from the form.
    const data = {
      username: username,
      email: email,
      password: password
    }

    try {
      const res = await nummiClient.post("register", data);
      console.log(res.data);
      router.push("/confirmation-email-sent?email=" + email)
    }
    catch (error) {
      const data = error.response?.data;
      if (data?.subErrors && Array.isArray(data.subErrors)) {
        for (const subError of data.subErrors) {
          if (subError.path === "username") {
            setUsernameError(subError.message);
          }
          else if (subError.path === "email") {
            setEmailError(subError.message);
          }
          else if (subError.path === "password") {
            setPasswordError(subError.message);
          }
          else {
            console.log(subError);
          }
        }
      }
      else {
        setBannerError(error.response?.data?.userMessage ?? "Unable to Register at this time. Please try again in a few minutes");
      }
    }
    finally {
      setClicked(false);
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <article>
        <RowBreak height={".6em"}/>
        <Banner className={styles.banner + (bannerError ? " banner-error" : " banner-disabled")}>
          {bannerError}
        </Banner>
        <form id={styles.form} className='form-box' onSubmit={handleSubmit}>
          <h1>Register</h1><RowBreak height=".8em"/>
          <TextField className={styles.textField} name="email" title="Email" warning={emailError}/><RowBreak height=".6em"/>
          <TextField className={styles.textField} name="username" title="Username" warning={usernameError}/><RowBreak height=".6em"/>
          <TextField className={styles.textField} name="password" type="password" title="Password" warning={passwordError}/><RowBreak height=".6em"/>
          <TextField className={styles.textField} name="retypedPassword" type="password" title="Retype Password" warning={retypedPasswordError}/><RowBreak height="1.8em"/>
          <button id={styles.registerButton} type="submit" className="button button-primary">
            Create Account{clicked && <span className='loader'></span>}
          </button>
          <RowBreak height="1.8em"/>
          <div className={styles.linkGroup}>
            <Link href="/login" id={styles.loginButton} className='inline'>Login</Link>
            <Link href="/resend-confirmation-email" className='inline'>Resend Confirmation Email</Link>
          </div>
        </form>
      </article>
    </>
  );
}

export default RegisterPage