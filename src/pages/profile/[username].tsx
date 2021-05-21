import React, { useContext } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@material-ui/core';

import Header from '@components/Header';
import MobileFooter from '@components/MobileFooter';
import ProfileLinks from '@components/Splitter/ProfileLinks';
import ThemeContext from '@context/theme';
import Timeline from '@components/Timeline';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_PROFILE_POSTS } from '@graphql/queries/post';
import { GET_PROFILE, GET_LOGGED_PROFILE } from '@graphql/queries/profile';
import { ILoggedProfile, IProfile } from '@interfaces/Profile';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import ProfileSEO from '@components/SEO/ProfileSEO';
import ProfileSection from '@components/ProfileSection';
import Link from 'next/link';
import CAButton from '@styles/components/button';
import ProfileContainer from './_styles';

const CAImage = dynamic(() => import('@components/CAImage'));

interface ProfileProps extends ILoggedProfile {
  username: string;
  getProfile: IProfile;
}

const Profile: React.FC<ProfileProps> = ({
  username,
  getProfile,
  getLoggedProfile,
}) => {
  const { isDarkMode } = useContext(ThemeContext);

  const hasCoverProfile = getProfile.coverImage !== '';

  return (
    <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
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
          <section className="no-logged">
            <div>
              <h4>Novo na Comp-Art?</h4>
              <p>Inscreva-se para explorar o mundo da arte!</p>
              <Link href="/register">
                <CAButton as="a">CRIAR CONTA</CAButton>
              </Link>
            </div>
          </section>
        </main>
        <MobileFooter />
      </ProfileContainer>
    </ThemeProvider>
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

  const loggedProfile = await client.query({
    query: GET_LOGGED_PROFILE,
    errorPolicy: 'ignore',
  });

  if (!profile.data.getProfile) {
    return {
      notFound: true,
    };
  }

  const { getProfile } = profile.data;

  if (jwtToken && !loggedProfile.data) {
    return {
      redirect: {
        destination: '/register-profile',
        permanent: false,
      },
    };
  }

  return {
    props: {
      username,
      getProfile,
      getLoggedProfile:
        loggedProfile.data && loggedProfile.data.getLoggedProfile,
    },
  };
};

export default Profile;
