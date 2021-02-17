import React, { useEffect } from 'react';
import Head from 'next/head';
import { useLazyQuery, useQuery } from '@apollo/client';

import Header from '../../components/Header';
import HomeContainer from '../../styles/pages/home';
import MobileHeader from '../../components/MobileHeader';
import MobileFooter from '../../components/MobileFooter';
import withAuth from '../../hocs/withAuth';
import Home from '../../components/Home';
import LevelContext from '../../context/level';
import ErrorRequest from '../../components/ErrorRequest';
import { ILoggedProfile } from '../../interfaces/Profile';
import {
  GET_LEVEL_XP,
  GET_LOGGED_PROFILE,
} from '../../graphql/queries/profile';

const HomePage: React.FC = () => {
  const {
    data: profileData,
    loading: loadingProfile,
    error: errorProfile,
  } = useQuery<ILoggedProfile>(GET_LOGGED_PROFILE);

  const [getLevel, { data: profileLevel }] = useLazyQuery(GET_LEVEL_XP, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getLevel();
  }, [getLevel]);

  if (loadingProfile) return <p>loading</p>;

  if (errorProfile) return <ErrorRequest />;

  const { getLoggedProfile } = profileData;

  return (
    <HomeContainer>
      <Head>
        <title>Comp-Art</title>
      </Head>
      <Header />
      <LevelContext.Provider
        value={{ updateLevel: getLevel, level: profileLevel }}
      >
        <Home getLoggedProfile={getLoggedProfile} />
        <MobileHeader
          loading={loadingProfile}
          getLoggedProfile={getLoggedProfile}
        />
      </LevelContext.Provider>
      <MobileFooter />
    </HomeContainer>
  );
};

export default withAuth(HomePage);
