import React from 'react';
import { gql, useQuery } from '@apollo/client';

import FormProfile from '@components/FormProfile';
import Header from '@components/Header';
import MobileFooter from '@components/MobileFooter';
import Meta from '@components/SEO/Meta';
import { GET_FULL_LOGGED_PROFILE } from '@graphql/queries/profile';
import withAuth from '@hocs/withAuth';
import EditProfileContainer from './_styles';

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: CreateProfileInput) {
    updateProfile(newProfileInput: $profile)
  }
`;

const EditProfile: React.FC = () => {
  const { data: profile, loading } = useQuery(GET_FULL_LOGGED_PROFILE, {
    fetchPolicy: 'no-cache',
  });

  return (
    <>
      <Meta
        title="Editar Perfil"
        description="Edite seu perfil"
        uri="edit"
        keywords="editar, perfil, comp art"
      />
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
      <MobileFooter />
    </>
  );
};

export default withAuth(EditProfile);
