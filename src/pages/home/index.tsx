import React from 'react';
import Head from 'next/head';

import Header from '../../components/Header';
import MobileHeader from '../../components/MobileHeader';
import MobileFooter from '../../components/MobileFooter';

const Home: React.FC = () => (
  <>
    <Head>
      <title>Comp-Art</title>
    </Head>
    <Header />
    <MobileHeader />
    <MobileFooter />
  </>
);

export default Home;
