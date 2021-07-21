import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { RiPlayListFill } from 'react-icons/ri';

import { initializeApollo } from '@graphql/apollo/config';
import withHome from '@hocs/withHome';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import getBase64Image from '@ssr-functions/getBase64Image';
import { ILoggedProfile } from '@interfaces/Profile';
import { BlurImageData } from '@interfaces/Generics';
import CAImage from '@components/CAImage';
import { FaHeadphones } from 'react-icons/fa';
import CAButton from '@styles/components/button';
import CASecondaryButton from '@styles/components/secondaryButton';
import PlaylistPageContainer from './styles';

interface PlaylistPageProps extends ILoggedProfile, BlurImageData {}

// eslint-disable-next-line arrow-body-style
const PlaylistPage: React.FC<PlaylistPageProps> = ({ blurDataUrl }) => {
  return (
    <PlaylistPageContainer>
      <div className="playlist-info">
        <div className="playlist-cover">
          <CAImage
            alt="Gato"
            layout="responsive"
            blurDataURL={blurDataUrl}
            quality={100}
            width={140}
            height={140}
            placeholder="blur"
            src="http://placekitten.com/600/600"
          />
        </div>
        <div className="playlist-info-content">
          <strong>Nome da playlist</strong>
          <div className="playlist-author-info">
            <p>
              Criado por:{' '}
              <Link href="/profile/">
                <a>user</a>
              </Link>{' '}
              em 19, jul 2021
            </p>
            <div className="playlist-counts">
              <div className="tracks">
                <RiPlayListFill /> <p>21 faixas</p>
              </div>
              <div className="pipe">|</div>
              <div className="followers">
                <FaHeadphones /> <p>30 seguidores</p>
              </div>
            </div>
          </div>
          <div className="buttons">
            <CAButton>OUVIR</CAButton>
            <CASecondaryButton>SEGUIR</CASecondaryButton>
          </div>
        </div>
      </div>
      <div className="playlist-description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          dicta vitae assumenda ipsa illum minus distinctio, natus voluptas
          laboriosam saepe nemo repellendus enim illo perspiciatis velit et quod
          ex nam?
        </p>
      </div>
    </PlaylistPageContainer>
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
