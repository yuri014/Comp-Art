import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
import ProfileSimpleCard from '../../components/ProfileCard';
import SearchContainer from './styles';

const HomePage: React.FC = () => {
  const {
    query: { query },
  } = useRouter();

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
              <SearchContainer>
                <section className="profile-results">
                  <p className="title">Resultados para &quot;{query}&quot;</p>
                  <div className="profiles-container">
                    <ProfileSimpleCard profile={profileData.getLoggedProfile} />
                  </div>
                </section>
              </SearchContainer>
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
            <p>TODO</p>
          </Home>
        </>
      )}
      <MobileFooter />
    </HomeContainer>
  );
};

export default HomePage;
