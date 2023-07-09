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

export default function ResetPassword() {
  const [bannerType, setBannerType] = useState(BannerType.ERROR);
  const [bannerMessage, setBannerMessage] = useState("");

  const form = useInputForm({
    fields: [
      {
        name: "username",
        validator: validateEmail
      }
    ],
    onSubmit: async (data) => await nummiClient.post("/reset-password?usernameOrEmail=" + data.email, {}),
    onSuccess: (res) => {
      setBannerType(BannerType.SUCCESS);
      setBannerMessage("Password reset email sent")
    },
    defaultErrorMessage: "Unable to reset password. Please try again in a few minutes"
  })

  return (
      <>
        <Head>
          <title>Reset Password</title>
        </Head>
        <article>
          <Banner bannerType={form.generalError != null ? BannerType.ERROR : BannerType.SUCCESS} omnipresent>
            {form.generalError != null ? form.generalError : bannerMessage}
          </Banner>
          <form className='form-box'>
            <h1>Reset Password</h1>
            <RowBreak height=".8em"/>
            <TextField
              field={form.getField("username")}
              placeholder='Username or Email'
              title="Username or Email" 
            />
            <RowBreak height={"1.8em"}/>
            <Button type="submit" className="button" style={{width: '100%'}} onClick={form.submit} disabled={form.submitted}>
              {form.submitted 
              ? <Loader/>
              : <><Icon name='mail' left/>Send Reset Password Link</>
            }
            </Button>
            <RowBreak height={".6em"}/>
          </form>
        </article>
      </>
  );
}