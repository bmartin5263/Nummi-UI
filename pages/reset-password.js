import Head from 'next/head';
import styles from 'styles/register.module.scss'
import React, { useState } from 'react'
import TextField from '../components/textField';
import RowBreak from '../components/rowBreak';
import Link from 'next/link';
import Banner, { BannerType } from '../components/banner';
import nummiClient from '../util/nummiClient';
import { extractErrors, validateEmail } from '../util/utils';
import { useRouter } from 'next/router';
import useLog from '../hooks/useLog';
import useInputField from '../hooks/useInputField'
import useInputForm from '../hooks/useInputForm'
import Button, { ButtonType } from '../components/button';
import Loader from '../components/loader';
import Icon from '../components/icon';

const log = useLog("ResetPasswordPage")

function ResetPasswordPage() {
  const router = useRouter();
  const email = router.query.email;
  const token = router.query.token;
  const form = useInputForm({
    fields: [
      {
        name: "password",
        shouldValidate: true,
        validator: (password) => {
          if (password == null || password == undefined || password == "") {
            return "Password is required";
          }
          else if (password.length < 8) {
            return "Password must be at least 8 characters";
          }
          else if (password.toUpperCase() == password) {
            return "Passwords must have at least one lowercase ('a'-'z')";
          }
          else if (password.toLowerCase() == password) {
            return "Passwords must have at least one uppercase ('A'-'Z')";
          }
          else if (!/\d/.test(password)) {
            return "Passwords must have at least one digit ('0'-'9')."
          }
          else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
            return "Passwords must have at least one special character."
          }
        }
      },
      {
        name: "retypedPassword"
      }
    ],
    preSubmitValidation: (fields, result) => {
      const passwordField = fields.get("password");
      const retypedPasswordField = fields.get("retypedPassword");
      if (passwordField.inputValue != retypedPasswordField.inputValue) {
        log("Passwords do not match")
        retypedPasswordField.setErrorMessage("Passwords do not match");
        retypedPasswordField.setInErrorState(true);
        result.failedFields.add(retypedPasswordField.name);
      }
    },
    onSubmit: async (req) => {
      return await nummiClient.post('/reset-password?token=' + token, {}, {
        auth: {
          username: email,
          password: req.password,
        }
      });
    },
    onSuccess: (req, res) => {
      router.push("/login?email=" + email + "&message=" + encodeURI("Password successfully reset! Please try logging in"))
    },
    fieldErrorExtractor: (res) => extractErrors(res)
  })

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <article>
        <Banner bannerType={BannerType.ERROR} omnipresent>
          {form.generalError}
        </Banner>
        <form className='form-box' onSubmit={form.submit}>
          <h1>Reset Password</h1>
          <RowBreak height=".8em"/>
          <TextField
            field={form.getField("password")}
            placeholder='Password'
            type='password'
            title="Password" 
            className={styles.textField}
          />
          <RowBreak height=".6em"/>
          <TextField
            field={form.getField("retypedPassword")}
            placeholder='Retype Password'
            type='password'
            title="Retype Password" 
            className={styles.textField}
          />
          <RowBreak height="1.8em"/>
          <Button id={styles.registerButton} buttonType={ButtonType.PRIMARY} disabled={form.submitted} onClick={e => {
            form.submit(e);
          }}>
            {form.submitted 
              ? <Loader/>
              : <><Icon name='lock_reset' style={{'fontSize': '1.75em'}} left/>{"Reset Password"}</>
            }
          </Button>
        </form>
      </article>
    </>
  );
}

export default ResetPasswordPage