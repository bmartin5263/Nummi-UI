import Head from 'next/head';
import Layout from '../../components/layout';

import React from 'react'

function UsersPage() {
  return (
    <Layout home>
      <Head>
        <title>Users</title>
      </Head>
      <p>Users</p>
    </Layout>
  );
}

export default UsersPage