import React, { useEffect } from 'react';
import Head from 'next/head';
import { useLazyQuery, useQuery } from '@apollo/client';

import Header from '../../components/Header';
import MobileHeader from '../../components/MobileHeader';
import MobileFooter from '../../components/MobileFooter';
import Home from '../../components/Home';
import LevelContext from '../../context/level';
import { ILoggedProfile } from '../../interfaces/Profile';
import {
  GET_LEVEL_XP,
  GET_LOGGED_PROFILE,
} from '../../graphql/queries/profile';
import HomeContainer from '../home/_styles';

const HomePage: React.FC = () => {
  const {
    data: profileData,
    loading: loadingProfile,
  } = useQuery<ILoggedProfile>(GET_LOGGED_PROFILE);

  const [getLevel, { data: profileLevel }] = useLazyQuery(GET_LEVEL_XP, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getLevel();
  }, [getLevel]);

  if (loadingProfile) return <p>loading</p>;

  return (
    <HomeContainer>
      <Head>
        <title>Comp-Art</title>
      </Head>
      {profileData ? (
        <>
          <Header getLoggedProfile={profileData.getLoggedProfile} />
          <LevelContext.Provider
            value={{ updateLevel: getLevel, level: profileLevel }}
          >
            <Home getLoggedProfile={profileData.getLoggedProfile}>
              <div>BLANK</div>
            </Home>
            <MobileHeader
              loading={loadingProfile}
              getLoggedProfile={profileData.getLoggedProfile}
            />
          </LevelContext.Provider>
        </>
      ) : (
        <>
          <Header />
          <Home>
            <div>BLANK</div>
          </Home>
        </>
      )}
      <MobileFooter />
    </HomeContainer>
  );
};

export default HomePage;
