import Head from 'next/head';
import Layout from '../../components/layout';

import React from 'react'

function UserPage() {
  return (
    <Layout home>
      <Head>
        <title>User</title>
      </Head>
      <p>User</p>
    </Layout>
  );
}

export default UserPage