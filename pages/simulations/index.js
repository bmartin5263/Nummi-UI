import Head from 'next/head';
import Layout from '../../components/layout';

import React from 'react'
import Banner from '../../components/banner';
import LoginButton from '../../components/loginButton';
import { getSession } from 'next-auth/react';
import nummiClient from '../../util/nummiClient';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useLog from '../../hooks/useLog';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]';

function SimulationsPage(props) {
  const isAuthenticated = useAuth(true);
  return (
    <>
      <Head>
        <title>Simulations</title>
      </Head>
      <Banner className="banner-info" text="Create an Account to Begin Trading!"/>
      <p>{isAuthenticated ? "yes" : "no"}</p>
    </>
  );
}

export default SimulationsPage

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, nextAuthOptions(context.req, context.res))
  const log = useLog("SimulationsPage")

  log("Getting Simulation Props")
  if (!session) {
      log("No Session");
      return {
          redirect: {
              destination: '/login',
              permanent: false
          }
      }
  }
  
  return {props: {}};
}