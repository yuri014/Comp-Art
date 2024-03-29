import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { Tabs, Tab } from '@material-ui/core';

import CAImage from '@components/CAImage';
import Header from '@components/Header';
import MobileFooter from '@components/MobileFooter';
import ProfileLinks from '@components/Splitter/ProfileLinks';
import SuggestedProfiles from '@components/SuggestedProfiles';
import Timeline from '@components/Timeline';
import { initializeApollo } from '@graphql/apollo/config';
import {
  GET_PROFILE_POSTS,
  GET_PROFILE_POSTS_AND_SHARES,
} from '@graphql/queries/post';
import { GET_PROFILE } from '@graphql/queries/profile';
import { ILoggedProfile, IProfile } from '@interfaces/Profile';
import ProfileSEO from '@components/SEO/ProfileSEO';
import ProfileSection from '@components/ProfileSection';
import { BlurImageData } from '@interfaces/Generics';
import ProfileSchema from '@schemas/Profile';
import CAButton from '@styles/components/button';
import withPublicRoute from '@hocs/withPublicRoute';
import getBase64Image from '@ssr-functions/getBase64Image';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import createOpmizeUrl from '@utils/createOptimizeUrl';
import ProfileContainer from './_styles';

interface ProfileProps extends ILoggedProfile, BlurImageData {
  username: string;
  getProfile: IProfile;
}

const Profile: React.FC<ProfileProps> = ({
  username,
  getProfile,
  getLoggedProfile,
  blurDataUrl,
}) => {
  const hasCoverProfile = getProfile.coverImage !== '';
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.ChangeEvent<HTMLElement>,
    newValue: number,
  ) => {
    setValue(newValue);
  };

  const shouldRenderPostAndShares = value === 0;

  return (
    <>
      <ProfileSEO getProfile={getProfile} />
      <Header getLoggedProfile={getLoggedProfile} />
      <ProfileContainer>
        <div
          className={`cover-profile ${
            hasCoverProfile ? '' : 'cover-placeholder'
          }`}
        >
          {hasCoverProfile && (
            <CAImage
              layout="fill"
              placeholder="blur"
              blurDataURL={blurDataUrl}
              quality={100}
              alt="Capa do perfil"
              src={createOpmizeUrl(getProfile.coverImage)}
            />
          )}

          <ProfileLinks links={getProfile.links} />
        </div>
        <main>
          <ProfileSection getProfile={getProfile} />
          <section className="profile-posts">
            {getProfile.isArtist && (
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Posts & Compartilhamentos" />
                <Tab label="Posts" />
              </Tabs>
            )}
            {shouldRenderPostAndShares ? (
              <Timeline
                query={GET_PROFILE_POSTS_AND_SHARES}
                queryName="getProfilePostsAndShares"
                otherVariables={{ username }}
              />
            ) : (
              <Timeline
                query={GET_PROFILE_POSTS}
                queryName="getProfilePosts"
                otherVariables={{ username }}
              />
            )}
          </section>
          {getLoggedProfile ? (
            <aside>
              <SuggestedProfiles />
            </aside>
          ) : (
            <section className="no-logged">
              <div>
                <h4>Novo na Comp-Art?</h4>
                <p>Inscreva-se para explorar o mundo da arte!</p>
                <Link href="/register">
                  <CAButton as="a">CRIAR CONTA</CAButton>
                </Link>
              </div>
            </section>
          )}
        </main>
        <MobileFooter />
      </ProfileContainer>
      <ProfileSchema profile={getProfile} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { username } = context.params;
  const { jwtToken } = context.req.cookies;

  const client = initializeApollo(null, jwtToken);

  const profile = await client.query({
    query: GET_PROFILE,
    variables: { username },
    errorPolicy: 'ignore',
  });

  if (!profile.data.getProfile) {
    return {
      notFound: true,
    };
  }

  const { getProfile } = profile.data;

  const getLoggedProfile = await getLoggedUserWithNoAuth(jwtToken, client);

  const coverImageBase64 = await getBase64Image(() => {
    if (createOpmizeUrl(getProfile.coverImage)) {
      return createOpmizeUrl(getProfile.coverImage);
    }

    return '';
  });

  return {
    props: {
      username,
      getProfile,
      getLoggedProfile,
      blurDataUrl: coverImageBase64,
    },
  };
};

export default withPublicRoute(Profile);
