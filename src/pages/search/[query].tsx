import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { gql, useLazyQuery, useQuery } from '@apollo/client';

import { GetServerSideProps } from 'next';
import Header from '../../components/Header';
import MobileHeader from '../../components/MobileHeader';
import MobileFooter from '../../components/MobileFooter';
import Home from '../../components/Home';
import LevelContext from '../../context/level';
import { ILoggedProfile, IProfile } from '../../interfaces/Profile';
import {
  GET_LEVEL_XP,
  GET_LOGGED_PROFILE,
} from '../../graphql/queries/profile';
import HomeContainer from '../home/_styles';
import ProfileSimpleCard from '../../components/ProfileCard';
import SearchContainer from './styles';
import { initializeApollo } from '../../graphql/apollo/config';

const GET_SEARCH_PROFILE = gql`
  query SearchProfiles($query: String!, $offset: Int!, $limit: Int!) {
    searchProfiles(query: $query, offset: $offset, limit: $limit) {
      bio
      name
      owner
      _id
      avatar
    }
  }
`;

interface SearchPageProps {
  profiles: Array<IProfile>;
}

const SearchPage: React.FC<SearchPageProps> = ({ profiles }) => {
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
                    {profiles.map(profile => (
                      <ProfileSimpleCard profile={profile} />
                    ))}
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

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context.params;

  const client = initializeApollo();

  const getProfiles = await client.query({
    query: GET_SEARCH_PROFILE,
    variables: { query, offset: 0, limit: 0 },
    errorPolicy: 'ignore',
  });

  const profiles = getProfiles.data.searchProfiles;

  return {
    props: {
      profiles,
    },
  };
};

export default SearchPage;
