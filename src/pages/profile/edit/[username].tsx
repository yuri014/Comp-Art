import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Header from '../../../components/Header';
import FormProfile from '../../../components/FormProfile';
import { IProfileInput } from '../../../interfaces/Profile';
import useImagePreview from '../../../hooks/imagePreview';
import { EditProfileContainer } from '../../../styles/pages/profile/style';
import MobileFooter from '../../../components/MobileFooter';

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
      <Header />
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

export default EditProfile;
