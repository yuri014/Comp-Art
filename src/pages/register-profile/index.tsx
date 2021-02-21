import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';

import Head from 'next/head';
import RegisterProfileContainer from '../../styles/pages/register-profile/styles';
import { IProfileInput } from '../../interfaces/Profile';
import { REGISTER_PROFILE } from '../../graphql/mutations/profile';
import withAuth from '../../hocs/withAuth';
import useImagePreview from '../../hooks/imagePreview';
import FormProfile from '../../components/FormProfile';

const RegisterProfile: React.FC = () => {
  const router = useRouter();
  const [showError, setShowError] = useState('');
  const [tags, setTags] = useState([]);

  const [profileImage, setProfileImage] = useImagePreview();

  const [coverImage, setCoverImage] = useImagePreview();

  const [createProfile] = useMutation(REGISTER_PROFILE, {
    onCompleted: () => router.push('/home'),
    onError: ({ graphQLErrors }) =>
      setShowError(graphQLErrors[0].extensions.errors),
  });

  const onSubmit = (data: IProfileInput) => {
    createProfile({
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
    <RegisterProfileContainer>
      <Head>
        <title>Comp-Art</title>
      </Head>
      <div id="register-profile-title" className="main-title">
        <h1>Crie seu perfil!</h1>
      </div>
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
    </RegisterProfileContainer>
  );
};

export default withAuth(RegisterProfile);
