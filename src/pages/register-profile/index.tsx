import React from 'react';

import Head from 'next/head';
import RegisterProfileContainer from './_styles';
import { REGISTER_PROFILE } from '../../graphql/mutations/profile';
import withAuth from '../../hocs/withAuth';
import FormProfile from '../../components/FormProfile';

const RegisterProfile: React.FC = () => (
  <RegisterProfileContainer>
    <Head>
      <title>Comp-Art</title>
    </Head>
    <div id="register-profile-title" className="main-title">
      <h1>Crie seu perfil!</h1>
    </div>
    <FormProfile mutation={REGISTER_PROFILE} />
  </RegisterProfileContainer>
);

export default withAuth(RegisterProfile);
