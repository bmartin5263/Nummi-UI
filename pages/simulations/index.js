import Head from 'next/head';
import Layout from '../../components/layout';

import React from 'react'
import Banner from '../../components/banner';
import LoginButton from '../../components/loginButton';
import { getSession } from 'next-auth/react';
import nummiClient from '../../util/nummiClient';
import axios from 'axios';

function SimulationsPage(props) {
  return (
    <>
      <Head>
        <title>Simulations</title>
      </Head>
      <Banner className="banner-info" text="Create an Account to Begin Trading!"/>
      <p>
        {props.info}
      </p>
    </>
  );
}

export default SimulationsPage

export async function getServerSideProps (context) {
  const session = await getSession(context)

  if (!session) {
      console.log("No Session");
      return {
          redirect: {
              destination: '/login',
              permanent: false
          }
      }
  }

  // This request works
  try {
    console.log("Getting Strings");
    const response = await axios('http://localhost:5045/dev/strings', {
      method: 'GET',
      withCredentials: true
    })
    // const response = await nummiClient.get('/dev/strings');
    return {
      props: {
          session,
          info: response.data
      }
  }
  }
  catch (error) {
    console.log(error);
    return {
      props: {
          session,
          info: "error"
      }
  }
  }
}