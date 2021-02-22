import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { gql, useMutation, useQuery } from '@apollo/client';

import Header from '../../../components/Header';
import FormProfile from '../../../components/FormProfile';
import { IProfileInput } from '../../../interfaces/Profile';
import useImagePreview from '../../../hooks/imagePreview';
import { EditProfileContainer } from '../../../styles/pages/profile/style';
import MobileFooter from '../../../components/MobileFooter';
import Meta from '../../../components/SEO/Meta';
import withAuth from '../../../hocs/withAuth';
import mainTheme from '../../../styles/themes/MainTheme';

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
  const [showError, setShowError] = useState('');
  const [tags, setTags] = useState([]);

  const [profileImage, setProfileImage] = useImagePreview();
  const [coverImage, setCoverImage] = useImagePreview();

  const { data: profile, loading } = useQuery(GET_LOGGED_PROFILE, {
    fetchPolicy: 'no-cache',
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const onSubmit = (data: IProfileInput) => {
    updateProfile({
      variables: {
        profile: {
          ...data,
          avatar: profileImage.file,
          coverImage: coverImage.file,
          hashtags: tags,
        },
      },
    });
  };

  return (
    <>
      <Meta
        title="Editar Perfil"
        description="Edite seu perfil"
        uri="/edit"
        keywords="editar, perfil, comp art"
      />
      <ThemeProvider theme={mainTheme}>
        <Header />
      </ThemeProvider>
      <EditProfileContainer>
        {!loading && (
          <FormProfile
            onSubmit={onSubmit}
            coverImagePreview={coverImage.preview as string}
            profileImagePreview={profileImage.preview as string}
            setCoverImage={setCoverImage}
            setProfileImage={setProfileImage}
            setShowError={setShowError}
            setTags={setTags}
            showError={showError}
            tags={tags}
            defaultValues={profile.getLoggedProfile}
          />
        )}
      </EditProfileContainer>
      <MobileFooter />
    </>
  );
};

export default withAuth(EditProfile);
