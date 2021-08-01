import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import ProfileSimpleCard from '@components/ProfileCard';
import Timeline from '@components/Timeline';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_SEARCH_POSTS, GET_SEARCH_PROFILE } from '@graphql/queries/search';
import { ILoggedProfile, IProfile } from '@interfaces/Profile';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import withHome from '@hocs/withHome';
import { SearchContainer } from './_styles';

interface SearchProps extends ILoggedProfile {
  profiles: Array<IProfile>;
}

const Search: React.FC<SearchProps> = ({ profiles }) => {
  const {
    query: { query },
  } = useRouter();

  return (
    <>
      <Head>
        <title>{query} - Comp-Art</title>
      </Head>
      <SearchContainer>
        <section className="profile-results">
          <p className="title">Resultados para &quot;{query}&quot;</p>
          <div className="profiles-container">
            {profiles.map(profile => (
              <ProfileSimpleCard key={profile._id} profile={profile} />
            ))}
          </div>
        </section>
        <section className="posts-results">
          <Timeline
            query={GET_SEARCH_POSTS}
            queryName="searchPost"
            otherVariables={{ query: `#${query}` }}
          />
        </section>
      </SearchContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context.params;
  const { jwtToken } = context.req.cookies;

  const client = initializeApollo(null, jwtToken);

  const getProfiles = await client.query({
    query: GET_SEARCH_PROFILE,
    variables: { query, offset: 0, limit: 10 },
    errorPolicy: 'ignore',
  });

  const profiles = getProfiles.data.searchProfiles;
  const getLoggedProfile = await getLoggedUserWithNoAuth(jwtToken, client);

  return {
    props: {
      profiles,
      getLoggedProfile,
    },
  };
};

export default withHome(Search);
