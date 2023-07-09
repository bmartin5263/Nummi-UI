import Head from 'next/head';
import RowBreak from '../components/rowBreak';
import nummiClient from '../util/nummiClient';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Banner, { BannerType } from '../components/banner';
import TextField from '../components/textField';
import Loader from '../components/loader';
import useInputForm from '../hooks/useInputForm';
import { validateEmail } from '../util/utils';
import Button from '../components/button';
import Icon from '../components/icon';

export default function EmailConfirmationSent() {
  const form = useInputForm({
    fields: [
      {
        name: "email",
        validator: validateEmail
      }
    ],
    onSubmit: async (data) => await nummiClient.post("/resend-confirmation-email?email=" + data.email, {}),
    defaultErrorMessage: "Unable to resend confirmation email"
  })

  return (
      <>
        <Head>
          <title>Resend Nummi Confirmation Email</title>
        </Head>
        <article>
          <Banner bannerType={BannerType.ERROR} omnipresent>
            {form.generalError}
          </Banner>
          <form className='form-box'>
            <h1>Resend Confirmation Email</h1>
            <RowBreak height=".8em"/>
            <TextField
              field={form.getField("email")}
              placeholder='Email'
              type='email'
              title="Email" 
            />
            <RowBreak height={"1.8em"}/>
            <Button type="submit" className="button button-primary" style={{width: '100%'}} onClick={form.submit} disabled={form.submitted}>
              {form.submitted 
              ? <Loader/>
              : <><Icon name='mail' left/>Resend Email</>
            }
            </Button>
            <RowBreak height={".6em"}/>
          </form>
        </article>
      </>
  );
}