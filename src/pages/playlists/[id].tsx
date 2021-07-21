import React from 'react';
import { GetServerSideProps } from 'next';

import { initializeApollo } from '@graphql/apollo/config';
import withHome from '@hocs/withHome';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import getBase64Image from '@ssr-functions/getBase64Image';
import { ILoggedProfile } from '@interfaces/Profile';
import { BlurImageData } from '@interfaces/Generics';

interface PlaylistPageProps extends ILoggedProfile, BlurImageData {}

// eslint-disable-next-line arrow-body-style
const PlaylistPage: React.FC<PlaylistPageProps> = () => {
  return (
    <div>
      <div className="playlist-info">
        <img src="" alt="" />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { jwtToken } = context.req.cookies;

  const client = initializeApollo(null, jwtToken);

  const coverImageBase64 = await getBase64Image(
    () => 'http://placekitten.com/600/600',
  );

  const getLoggedProfile = await getLoggedUserWithNoAuth(jwtToken, client);

  return {
    props: {
      getLoggedProfile,
      blurDataUrl: coverImageBase64,
    },
  };
};

export default withHome(PlaylistPage);
