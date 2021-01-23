import React from 'react';
import Head from 'next/head';

import withAuth from '../../hocs/withAuth';
import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import CreatePost from '../../components/Post/CreatePost';
import MobileHeader from '../../components/MobileHeader';

const NewPost: React.FC = () => (
  <div>
    <Head>
      <title>Novo Post</title>
    </Head>
    <Header />
    <MobileHeader />
    <main>
      <CreatePost />
    </main>
    <MobileFooter />
  </div>
);

export default withAuth(NewPost);
