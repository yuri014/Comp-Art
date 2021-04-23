import React, { useContext } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';

import Header from '../../../components/Header';
import FormProfile from '../../../components/FormProfile';
import { EditProfileContainer } from '../_style';
import MobileFooter from '../../../components/MobileFooter';
import Meta from '../../../components/SEO/Meta';
import withAuth from '../../../hocs/withAuth';
import mainLightTheme from '../../../styles/themes/MainLightTheme';
import mainDarkTheme from '../../../styles/themes/MainDarkTheme';
import ThemeContext from '../../../context/theme';

export const GET_LOGGED_PROFILE = gql`
  query GetLoggedProfile {
    getLoggedProfile {
      name
      avatar
      coverImage
      bio
      followers
      following
      hashtags
      owner
      isArtist
      links {
        soundcloud
        twitter
        facebook
        wattpad
        pinterest
        deviantart
        bandcamp
        customLink
      }
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: CreateProfileInput) {
    updateProfile(newProfileInput: $profile)
  }
`;

const EditProfile: React.FC = () => {
  const { data: profile, loading } = useQuery(GET_LOGGED_PROFILE, {
    fetchPolicy: 'no-cache',
  });
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Meta
        title="Editar Perfil"
        description="Edite seu perfil"
        uri="/edit"
        keywords="editar, perfil, comp art"
      />
      <ThemeProvider theme={theme === 'light' ? mainLightTheme : mainDarkTheme}>
        {!loading && (
          <>
            <Header getLoggedProfile={profile.getLoggedProfile} />
            <EditProfileContainer>
              <FormProfile
                mutation={UPDATE_PROFILE}
                defaultValues={profile.getLoggedProfile}
              />
            </EditProfileContainer>
          </>
        )}
      </ThemeProvider>
      <MobileFooter />
    </>
  );
};

export default withAuth(EditProfile);
