import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import Head from 'next/head';

import ToggleThemeButton from '@components/ToggleTheme';
import Footer from '@components/Footer';
import Title from '@components/Title';
import { AuthContext } from '@context/auth';
import { CONFIRMATION_EMAIL } from '@graphql/mutations/user';
import ConfirmationEmailContainer from './_styles';

const ConfirmationEmail: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const [hasError, setHasErrors] = useState(false);
  const authContext = useContext(AuthContext);

  const [confirmEmail] = useMutation(CONFIRMATION_EMAIL, {
    onCompleted: response =>
      authContext.login({ ...response.confirmationEmail, token }),
    onError: () => setHasErrors(true),
  });

  useEffect(() => {
    if (token) {
      confirmEmail({
        variables: { token },
      });
    }
  }, [confirmEmail, token]);

  return (
    <ConfirmationEmailContainer>
      <Head>
        <title>Confirmação de email</title>
      </Head>
      <div className="container">
        <header>
          <ToggleThemeButton />
        </header>
        <main>
          <Title />
          <p>
            Agradecemos pela sua inscrição
            <br />
            Seu e-mail foi confirmado com sucesso
          </p>
          <img
            src="/assets/email-confirmation-icon.svg"
            alt="Mão segurando celular com ícone de email"
          />
          <p>Venha explorar esse novo mundo da arte!</p>
          <Link href="/home">
            <a>EXPLORAR</a>
          </Link>
        </main>
        <Footer />
      </div>
    </ConfirmationEmailContainer>
  );
};

export default ConfirmationEmail;
