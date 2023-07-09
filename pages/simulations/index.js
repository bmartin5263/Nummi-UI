import Head from 'next/head';

import React from 'react'
import Banner, { BannerType } from '../../components/banner';
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
      <article>
        <Banner bannerType={BannerType.INFO}>
          Create an Account
        </Banner>
        <p>{isAuthenticated ? "yes" : "no"}</p>
      </article>
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