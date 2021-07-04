import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

import CAImage from '@components/CAImage';
import Header from '@components/Header';
import MobileFooter from '@components/MobileFooter';
import ProfileLinks from '@components/Splitter/ProfileLinks';
import SuggestedProfiles from '@components/SuggestedProfiles';
import Timeline from '@components/Timeline';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_PROFILE_POSTS } from '@graphql/queries/post';
import { GET_PROFILE } from '@graphql/queries/profile';
import { ILoggedProfile, IProfile } from '@interfaces/Profile';
import ProfileSEO from '@components/SEO/ProfileSEO';
import ProfileSection from '@components/ProfileSection';
import ProfileSchema from '@schemas/Profile';
import CAButton from '@styles/components/button';
import withPublicRoute from '@hocs/withPublicRoute';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import ProfileContainer from './_styles';

interface ProfileProps extends ILoggedProfile {
  username: string;
  getProfile: IProfile;
}

const Profile: React.FC<ProfileProps> = ({
  username,
  getProfile,
  getLoggedProfile,
}) => {
  const hasCoverProfile = getProfile.coverImage !== '';

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
          {hasCoverProfile && <CAImage image={getProfile.coverImage} />}

          <ProfileLinks links={getProfile.links} />
        </div>
        <main>
          <ProfileSection getProfile={getProfile} />
          <section className="profile-posts">
            <Timeline
              query={GET_PROFILE_POSTS}
              queryName="getProfilePosts"
              otherVariables={{ username }}
            />
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

  return {
    props: {
      username,
      getProfile,
      getLoggedProfile,
    },
  };
};

export default withPublicRoute(Profile);
