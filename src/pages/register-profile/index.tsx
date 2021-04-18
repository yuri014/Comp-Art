import React, { useContext } from 'react';

import Head from 'next/head';
import RegisterProfileContainer from './_styles';
import { REGISTER_PROFILE } from '../../graphql/mutations/profile';
import withAuth from '../../hocs/withAuth';
import FormProfile from '../../components/FormProfile';
import Title from '../../components/Title';
import Footer from '../../components/Footer';
import { AuthContext } from '../../context/auth';

const RegisterProfile: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <RegisterProfileContainer>
      <Head>
        <title>Comp-Art</title>
      </Head>
      <div className="container">
        <div className="message">
          <Title />
          <p>
            Vamos lá, falta pouco... Crie seu perfil de{' '}
            {user.isArtist ? 'artista' : 'fã'}!
          </p>
        </div>
        <FormProfile mutation={REGISTER_PROFILE} />
        <Footer />
      </div>
    </RegisterProfileContainer>
  );
};

export default withAuth(RegisterProfile);
