import Head from 'next/head';
import Layout from '../../components/layout';

import React from 'react'
import Banner from '../../components/banner';
import Button from '../../components/button';

function StrategiesPage() {
  return (
    <>
      <Head>
        <title>Strategies</title>
      </Head>
      <br></br>
      <div style={{display: 'flex'}}>
        <table style={{flexGrow: '1'}}>
          <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Latest Version</th>
              <th>Actions</th>
          </tr>
          <tr>
              <td>Opportunist</td>
              <td>Nummi</td>
              <td>0</td>
              <td><Button className='button button-primary' style={{width: '100%'}}>Simulate</Button></td>
          </tr>
          <tr>
              <td>Mummy Dust</td>
              <td>Nummi</td>
              <td>3</td>
              <td><Button className='button button-primary' style={{width: '100%'}}>Simulate</Button></td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default StrategiesPage