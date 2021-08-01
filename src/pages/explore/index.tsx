import React from 'react';
import { GetServerSideProps } from 'next';

import Timeline from '@components/Timeline';
import { GET_EXPLORE_POSTS } from '@graphql/queries/post';
import { initializeApollo } from '@graphql/apollo/config';
import { ILoggedProfile } from '@interfaces/Profile';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import withHome from '@hocs/withHome';
import Meta from '@components/SEO/Meta';

const Explore: React.FC<ILoggedProfile> = () => (
  <>
    <Meta
      title="Explorar - Comp-Art"
      description="Rede social com o propósito de ajudar a divulgação de artistas."
      keywords="Comp-Art, comp-art, comp art, divulgação, arte, música, ilustrações, artistas, explorar, descobrir"
    />
    <Timeline query={GET_EXPLORE_POSTS} queryName="getExplorePosts" />
  </>
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwtToken } = req.cookies;

  const client = initializeApollo(null, jwtToken);

  const getLoggedProfile = await getLoggedUserWithNoAuth(jwtToken, client);

  return {
    props: {
      getLoggedProfile,
    },
  };
};

export default withHome(Explore);
