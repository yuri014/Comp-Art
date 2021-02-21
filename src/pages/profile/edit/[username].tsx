import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@material-ui/core';

import Header from '../../../components/Header';
import FormProfile from '../../../components/FormProfile';
import { IProfileInput } from '../../../interfaces/Profile';
import useImagePreview from '../../../hooks/imagePreview';
import { EditProfileContainer } from '../../../styles/pages/profile/style';
import MobileFooter from '../../../components/MobileFooter';
import Meta from '../../../components/SEO/Meta';
import withAuth from '../../../hocs/withAuth';
import mainTheme from '../../../styles/themes/MainTheme';

const EditProfile: React.FC = () => {
  const router = useRouter();
  const [showError, setShowError] = useState('');
  const [tags, setTags] = useState([]);

  const [profileImage, setProfileImage] = useImagePreview();

  const [coverImage, setCoverImage] = useImagePreview();

  const onSubmit = (data: IProfileInput) => {
    console.log(data);
  };

  return (
    <>
      <Meta
        title="Editar Perfil"
        description="Edite seu perfil"
        uri="/edit/"
        keywords="editar, perfil, comp art"
      />
      <ThemeProvider theme={mainTheme}>
        <Header />
      </ThemeProvider>
      <EditProfileContainer>
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
        />
      </EditProfileContainer>
      <MobileFooter />
    </>
  );
};

export default withAuth(EditProfile);
