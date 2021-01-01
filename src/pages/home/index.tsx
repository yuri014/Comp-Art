import React from 'react';
import Head from 'next/head';

import MobileFooter from '../../components/MobileFooter';
import MobileHeader from '../../components/MobileHeader';

const Home: React.FC = () => (
  <>
    <Head>
      <title>Comp-Art</title>
    </Head>
    <MobileHeader />
    <MobileFooter />
  </>
);

export default Home;
