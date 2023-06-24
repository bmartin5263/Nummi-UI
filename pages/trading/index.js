import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import nummiClient from '../../util/nummiClient';

function TradePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    nummiClient.get(process.env.NEXT_PUBLIC_NUMMI_API_URL + '/dev/anon-strings')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
        setPosts(["error :("])
      });
  }, []);

  return (
    <>
      <Head>
        <title>Trade</title>
      </Head>
      <ul>
      {posts.map(post => (
        <li key={post}>{post}</li>
      ))}
    </ul>
    </>
  );
}

export default TradePage