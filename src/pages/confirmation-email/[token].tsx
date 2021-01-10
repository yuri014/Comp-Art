import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import Head from 'next/head';

import PressStartButton from '../../components/PressStartButton';
import { CONFIRMATION_EMAIL } from '../../graphql/mutations/user';
import ConfirmationEmailContainer from '../../styles/pages/confirmation-email/styles';
import { AuthContext } from '../../context/auth';

const ConfirmationEmail: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const [hasError, setHasErrors] = useState(false);
  const authContext = useContext(AuthContext);

  const [confirmEmail] = useMutation(CONFIRMATION_EMAIL);

  useEffect(() => {
    if (token) {
      confirmEmail({
        variables: { token },
      })
        .then(({ data }) => {
          authContext.login({ ...data.confirmationEmail, token });
        })
        .catch(() => setHasErrors(true));
    }
  }, [token]);

  return (
    <ConfirmationEmailContainer>
      <Head>
        <title>Confirmação de email</title>
      </Head>
      {!hasError ? (
        <div className="confirm-email-message">
          <h1>Sua conta agora está ativa!</h1>
          <PressStartButton>
            <Link href="/home">
              <a>Start</a>
            </Link>
          </PressStartButton>
        </div>
      ) : (
        <div className="error-confirm-email">
          <h1>OPS! Aconteceu algo de errado na confirmação do seu email!</h1>
          <h2>Refaça seu login para gerar um novo email</h2>
          <PressStartButton>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </PressStartButton>
        </div>
      )}
    </ConfirmationEmailContainer>
  );
};

export default ConfirmationEmail;
