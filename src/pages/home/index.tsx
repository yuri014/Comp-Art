import React from 'react';
import Head from 'next/head';

import Header from '../../components/Header';
import HomeContainer from '../../styles/pages/home';
import HomeProfile from '../../components/HomeProfile';
import MobileHeader from '../../components/MobileHeader';
import MobileFooter from '../../components/MobileFooter';
import Post from '../../components/Post';
import QuestsProgress from '../../components/QuestsProgress';

const Home: React.FC = () => (
  <HomeContainer>
    <Head>
      <title>Comp-Art</title>
    </Head>
    <Header />
    <div className="home-desktop-content">
      <HomeProfile />
      <div className="timeline">
        <Post />
      </div>
      <div className="quests">
        <QuestsProgress />
      </div>
    </div>
    <MobileHeader />
    <MobileFooter />
  </HomeContainer>
);

export default Home;
